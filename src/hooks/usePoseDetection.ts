import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  PoseDetector,
  SupportedModels,
  createDetector,
} from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgpu";
import {
  configurePose,
  defaultCoords,
  detectPose,
  detectSquats,
  drawPose,
  Exercise,
  faceKeypoints,
} from "../utils/poseDetection";

type VideoData = {
  video?: HTMLVideoElement | null;
  canvas?: HTMLCanvasElement | null;
  exerciseToDetect?: Exercise;
};

export const usePoseDetection = ({
  canvas,
  video,
  exerciseToDetect,
}: VideoData) => {
  const [progress, setProgress] = useState(0);
  const [totalReps, setTotalReps] = useState(0);
  const [repInProgress, setRepInProgress] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [detector, setDetector] = useState<PoseDetector | null>(null);

  const requestRef = useRef(0);
  const previousTimeRef = useRef(0);

  const coords = useRef(defaultCoords);

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
        const pose = await detectPose(detector, video);

        if (pose) {
          const poseConfigured = configurePose(pose, coords);
          drawPose(poseConfigured, ctx, video, faceKeypoints);

          if (exerciseToDetect === "squats") {
            const progress = detectSquats(
              poseConfigured,
              repInProgress,
              () => setRepInProgress(true),
              () => {
                setRepInProgress(false);
                setTotalReps((r) => r + 1);
              }
            );
            if (progress) {
              setProgress(progress);
            }
          }
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

  return { detecting, start, stop, toggle, totalReps, progress };
};
