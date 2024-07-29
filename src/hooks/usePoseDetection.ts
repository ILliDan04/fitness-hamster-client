import "@tensorflow/tfjs-backend-webgpu";
import { useCallback, useEffect, useRef, useState } from "react";
import PoseDetectionStatus from "@/utils/PoseDetectionStatus";
import { faceKeypoints } from "@/utils/poseDetection";

type VideoData = {
  video?: HTMLVideoElement | null;
  canvas?: HTMLCanvasElement | null;
};

export const usePoseDetection = ({ canvas, video }: VideoData) => {
  const requestRef = useRef(0);

  const [controllerObj, setControllerObj] =
    useState<PoseDetectionStatus | null>(null);

  const run = useCallback(
    async (time: number) => {
      if (!controllerObj || requestRef.current === -1) return;

      await controllerObj.detectPose(time);
      controllerObj.drawPose(faceKeypoints);
      requestRef.current = requestAnimationFrame(run);
    },
    [controllerObj]
  );

  useEffect(() => {
    if (!controllerObj || !controllerObj.initialized) return;

    requestRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(requestRef.current);
  }, [controllerObj, run]);

  useEffect(() => {
    if (!video || !canvas) return;

    const init = async () => {
      await PoseDetectionStatus.initDetector();
      const controller = new PoseDetectionStatus(canvas, video);
      setControllerObj(controller);
    };
    init();
  }, [canvas, video]);

  return controllerObj;
};

export type UsePoseDetectionReturn = ReturnType<typeof usePoseDetection>;
