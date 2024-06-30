import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Keypoint,
  Pose,
  PoseDetector,
  SupportedModels,
  createDetector,
  util,
} from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgpu";

type VideoData = {
  video: HTMLVideoElement | null;
  canvas: HTMLCanvasElement | null;
};

export const usePoseDetection = ({ canvas, video }: VideoData) => {
  const [detecting, setDetecting] = useState(false);
  const [detector, setDetector] = useState<PoseDetector | null>(null);

  const start = useCallback(() => setDetecting(true), []);
  const stop = useCallback(() => setDetecting(false), []);
  const toggle = useCallback(() => setDetecting((value) => !value), []);

  const ctx = useMemo(() => canvas?.getContext("2d") ?? null, [canvas]);
  const canRender = useMemo(() => {
    return !!(canvas && video && ctx && detector && video.readyState === 4);
  }, [canvas, video, detector, ctx]);

  const calculateAngle = useCallback(
    (a: Keypoint, b: Keypoint, c: Keypoint) => {
      const radians =
        Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
      return Math.abs((radians * 180) / Math.PI);
    },
    []
  );

  const drawPose = useCallback(
    (pose: Pose) => {
      if (!canRender) return;

      ctx!.clearRect(0, 0, video!.width, video!.height);
      ctx!.drawImage(video!, 0, 0, video!.width, video!.height);

      pose.keypoints.forEach(({ x, y, score }) => {
        if (score && score > 0.5) {
          ctx!.beginPath();
          ctx!.arc(x, y, 5, 0, 2 * Math.PI);
          ctx!.fillStyle = "red";
          ctx!.fill();
        }
      });

      const adjacentKeyPoints = util.getAdjacentPairs(SupportedModels.MoveNet);
      adjacentKeyPoints.forEach(([i, j]) => {
        const kp1 = pose.keypoints[i];
        const kp2 = pose.keypoints[j];

        if ((kp1.score ?? 0) > 0.5 && (kp2.score ?? 0) > 0.5) {
          ctx!.beginPath();
          ctx!.moveTo(kp1.x, kp1.y);
          ctx!.lineTo(kp2.x, kp2.y);
          ctx!.strokeStyle = "red";
          ctx!.stroke();
        }
      });
    },
    [ctx, video, canRender]
  );

  const detectBicepsCurls = useCallback(
    (pose: Pose) => {
      const leftElbow = pose.keypoints.find((k) => k.name === "left_elbow");
      const leftWrist = pose.keypoints.find((k) => k.name === "left_wrist");
      const leftShoulder = pose.keypoints.find(
        (k) => k.name === "left_shoulder"
      );

      if (leftElbow && leftWrist && leftShoulder) {
        const angle = calculateAngle(leftShoulder, leftElbow, leftWrist);
        // console.log(`Left arm angle: ${angle}`);
        if (angle < 45) {
          // console.log("Biceps curl detected");
        }
      }
    },
    [calculateAngle]
  );

  const detectPose = useCallback(async () => {
    if (!canRender) return;

    const poses = await detector!.estimatePoses(video!);

    if (poses.length > 0) {
      const pose = poses[0];
      drawPose(pose);
      detectBicepsCurls(pose);
    }
    requestAnimationFrame(() => detectPose());
  }, [canRender, detectBicepsCurls, detector, drawPose, video]);

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

  useEffect(() => {
    if (detecting && canRender) {
      detectPose();
    }
  }, [canRender, detectPose, detecting]);

  return { detecting, start, stop, toggle };
};
