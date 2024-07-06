import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  PoseDetector,
  SupportedModels,
  createDetector,
} from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgpu";
import { detectPose, detectSquats } from "../utils/poseDetection";

type VideoData = {
  video: HTMLVideoElement | null;
  canvas: HTMLCanvasElement | null;
  exerciseToDetect?: "squats";
};

export const CANVAS_SIZE = {
  width: 600,
  height: 800,
};

export const usePoseDetection = ({
  canvas,
  video,
  exerciseToDetect,
}: VideoData) => {
  const [totalReps, setTotalReps] = useState(0);
  const [repInProgress, setRepInProgress] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [detector, setDetector] = useState<PoseDetector | null>(null);

  const requestRef = useRef(0);
  const previousTimeRef = useRef(0);

  const ctx = useMemo(() => canvas?.getContext("2d") ?? null, [canvas]);

  const start = useCallback(() => setDetecting(true), []);
  const stop = useCallback(() => setDetecting(false), []);
  const toggle = useCallback(() => setDetecting((value) => !value), []);

  const run = useCallback(
    async (time: number) => {
      if (
        previousTimeRef.current != undefined &&
        detector &&
        video &&
        ctx &&
        detecting
      ) {
        const pose = await detectPose(detector, video, ctx);
        if (exerciseToDetect === "squats" && pose) {
          detectSquats(
            pose,
            repInProgress,
            () => setRepInProgress(true),
            () => {
              setRepInProgress(false);
              setTotalReps((r) => r + 1);
            }
          );
        }
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(run);
    },
    [ctx, detecting, detector, exerciseToDetect, repInProgress, video]
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(requestRef.current);
  }, [run]);

  useEffect(() => {
    const init = async () => {
      if (tf.engine().findBackend("webgpu")) {
        await tf.setBackend("webgpu");
      } else if (tf.engine().findBackend("webgl")) {
        await tf.setBackend("webgl");
      } else {
        await tf.setBackend("cpu");
      }
      await tf.ready();

      const detector = await createDetector(SupportedModels.MoveNet);
      setDetector(detector);
    };
    init();
  }, []);

  return { detecting, start, stop, toggle, totalReps };
};
