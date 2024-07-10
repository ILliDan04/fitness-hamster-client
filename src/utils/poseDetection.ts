import {
  Keypoint,
  Pose,
  PoseDetector,
} from "@tensorflow-models/pose-detection";

import { MutableRefObject } from "react";

export enum KeypointName {
  NOSE = "nose",
  LEFT_EYE = "left_eye",
  RIGHT_EYE = "right_eye",
  LEFT_EAR = "left_ear",
  RIGHT_EAR = "right_ear",
  LEFT_SHOULDER = "left_shoulder",
  RIGHT_SHOULDER = "right_shoulder",
  LEFT_ELBOW = "left_elbow",
  RIGHT_ELBOW = "right_elbow",
  LEFT_WRIST = "left_wrist",
  RIGHT_WRIST = "right_wrist",
  LEFT_HIP = "left_hip",
  RIGHT_HIP = "right_hip",
  LEFT_KNEE = "left_knee",
  RIGHT_KNEE = "right_knee",
  LEFT_ANKLE = "left_ankle",
  RIGHT_ANKLE = "right_ankle",
}
export type Exercise = "squats";

export type KeypointCoords = { x: number; y: number };
export type PoseConfigured = Partial<Record<KeypointName, KeypointCoords>>;

export type CoordsMemoized = Record<KeypointName, { x: number[]; y: number[] }>;
export const defaultCoords: CoordsMemoized = {
  [KeypointName.NOSE]: { x: [], y: [] },
  [KeypointName.LEFT_EYE]: { x: [], y: [] },
  [KeypointName.RIGHT_EYE]: { x: [], y: [] },
  [KeypointName.LEFT_EAR]: { x: [], y: [] },
  [KeypointName.RIGHT_EAR]: { x: [], y: [] },
  [KeypointName.LEFT_SHOULDER]: { x: [], y: [] },
  [KeypointName.RIGHT_SHOULDER]: { x: [], y: [] },
  [KeypointName.LEFT_ELBOW]: { x: [], y: [] },
  [KeypointName.RIGHT_ELBOW]: { x: [], y: [] },
  [KeypointName.LEFT_WRIST]: { x: [], y: [] },
  [KeypointName.RIGHT_WRIST]: { x: [], y: [] },
  [KeypointName.LEFT_HIP]: { x: [], y: [] },
  [KeypointName.RIGHT_HIP]: { x: [], y: [] },
  [KeypointName.LEFT_KNEE]: { x: [], y: [] },
  [KeypointName.RIGHT_KNEE]: { x: [], y: [] },
  [KeypointName.LEFT_ANKLE]: { x: [], y: [] },
  [KeypointName.RIGHT_ANKLE]: { x: [], y: [] },
};

export const defaultPose: PoseConfigured = {
  [KeypointName.NOSE]: { x: 0, y: 0 },
  [KeypointName.LEFT_EYE]: { x: 0, y: 0 },
  [KeypointName.RIGHT_EYE]: { x: 0, y: 0 },
  [KeypointName.LEFT_EAR]: { x: 0, y: 0 },
  [KeypointName.RIGHT_EAR]: { x: 0, y: 0 },
  [KeypointName.LEFT_SHOULDER]: { x: 0, y: 0 },
  [KeypointName.RIGHT_SHOULDER]: { x: 0, y: 0 },
  [KeypointName.LEFT_ELBOW]: { x: 0, y: 0 },
  [KeypointName.RIGHT_ELBOW]: { x: 0, y: 0 },
  [KeypointName.LEFT_WRIST]: { x: 0, y: 0 },
  [KeypointName.RIGHT_WRIST]: { x: 0, y: 0 },
  [KeypointName.LEFT_HIP]: { x: 0, y: 0 },
  [KeypointName.RIGHT_HIP]: { x: 0, y: 0 },
  [KeypointName.LEFT_KNEE]: { x: 0, y: 0 },
  [KeypointName.RIGHT_KNEE]: { x: 0, y: 0 },
  [KeypointName.LEFT_ANKLE]: { x: 0, y: 0 },
  [KeypointName.RIGHT_ANKLE]: { x: 0, y: 0 },
};

export const adjacentKeyPoints: [KeypointName, KeypointName][] = [
  [KeypointName.NOSE, KeypointName.LEFT_EYE],
  [KeypointName.NOSE, KeypointName.RIGHT_EYE],
  [KeypointName.LEFT_EYE, KeypointName.LEFT_EAR],
  [KeypointName.RIGHT_EYE, KeypointName.RIGHT_EAR],

  [KeypointName.LEFT_SHOULDER, KeypointName.LEFT_HIP],
  [KeypointName.LEFT_HIP, KeypointName.LEFT_KNEE],
  [KeypointName.LEFT_KNEE, KeypointName.LEFT_ANKLE],
  [KeypointName.LEFT_SHOULDER, KeypointName.LEFT_ELBOW],
  [KeypointName.LEFT_ELBOW, KeypointName.LEFT_WRIST],

  [KeypointName.RIGHT_SHOULDER, KeypointName.RIGHT_HIP],
  [KeypointName.RIGHT_HIP, KeypointName.RIGHT_KNEE],
  [KeypointName.RIGHT_KNEE, KeypointName.RIGHT_ANKLE],
  [KeypointName.RIGHT_SHOULDER, KeypointName.RIGHT_ELBOW],
  [KeypointName.RIGHT_ELBOW, KeypointName.RIGHT_WRIST],

  [KeypointName.RIGHT_SHOULDER, KeypointName.LEFT_SHOULDER],
  [KeypointName.RIGHT_HIP, KeypointName.LEFT_HIP],
];

export const faceKeypoints: KeypointName[] = [
  KeypointName.NOSE,
  KeypointName.LEFT_EYE,
  KeypointName.RIGHT_EYE,
  KeypointName.LEFT_EAR,
  KeypointName.RIGHT_EAR,
];

export const exerciseKeypointsMapper: Record<Exercise, KeypointName[]> = {
  squats: [
    KeypointName.LEFT_HIP,
    KeypointName.RIGHT_HIP,
    KeypointName.LEFT_KNEE,
    KeypointName.RIGHT_KNEE,
    KeypointName.LEFT_ANKLE,
    KeypointName.RIGHT_ANKLE,
  ],
};

export const CANVAS_SIZE = {
  width: 600,
  height: 800,
};

const calculateAngle = (a: Keypoint, b: Keypoint, c: Keypoint) => {
  const arg =
    Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  const angle = (Math.abs(arg) / Math.PI) * 180;
  return angle > 180 ? 360 - angle : angle;
};

export const drawPose = (
  pose: PoseConfigured,
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  keypointsToExclude?: KeypointName[]
) => {
  ctx.clearRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
  ctx.drawImage(video, 0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);

  // Use only specified keypoints
  const filteredKeypoints = Object.entries(pose).filter(([name]) => {
    return (
      !keypointsToExclude || !keypointsToExclude?.includes(name as KeypointName)
    );
  });

  const filteredPose = Object.fromEntries(filteredKeypoints);

  // Draw keypoints
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filteredKeypoints.forEach(([_, { x, y }]) => {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
  });

  // Draw lines between keypoints
  adjacentKeyPoints.forEach(([p1, p2]) => {
    if (p1 in filteredPose && p2 in filteredPose) {
      ctx.beginPath();
      ctx.moveTo(filteredPose[p1].x, filteredPose[p1].y);
      ctx.lineTo(filteredPose[p2].x, filteredPose[p2].y);
      ctx.strokeStyle = "red";
      ctx.stroke();
    }
  });
};

export const detectSquats = (
  poseConfigured: PoseConfigured,
  repInProgress: boolean,
  onSquatDetected: () => void,
  onSquatFinished: () => void
) => {
  const leftHip = poseConfigured[KeypointName.LEFT_HIP];
  if (!leftHip) return;

  const rightHip = poseConfigured[KeypointName.RIGHT_HIP];
  if (!rightHip) return;

  const leftKnee = poseConfigured[KeypointName.LEFT_KNEE];
  if (!leftKnee) return;

  const rightKnee = poseConfigured[KeypointName.RIGHT_KNEE];
  if (!rightKnee) return;

  const leftAnkle = poseConfigured[KeypointName.LEFT_ANKLE];
  if (!leftAnkle) return;

  const rightAnkle = poseConfigured[KeypointName.RIGHT_ANKLE];
  if (!rightAnkle) return;

  const rightAngle = calculateAngle(rightAnkle, rightKnee, rightHip);
  const leftAngle = calculateAngle(leftAnkle, leftKnee, leftHip);

  // Squat is done when both legs have angle less than 90
  if (leftAngle < 110 && rightAngle < 110 && !repInProgress) {
    onSquatDetected();
    // Squat is finished when both legs have angle greater than 160
  } else if (leftAngle > 160 && rightAngle > 160 && repInProgress) {
    onSquatFinished();
  }

  return Math.min(
    Math.round((5 / 6) * (180 - Math.max(rightAngle, leftAngle))),
    100
  );
};

export const configurePose = (
  pose: Pose,
  coordsMemo: MutableRefObject<CoordsMemoized>
) => {
  return pose.keypoints
    .filter((kp) => {
      // Identify the keypoint
      const name = kp.name as KeypointName;

      // Remove old positions of point if it is not found
      if ((kp.score ?? 0) < 0.4) {
        coordsMemo.current[name] = { x: [], y: [] };
        return false;
      }

      return true;
    })
    .reduce((prev, kp) => {
      // Identify the keypoint
      const name = kp.name as KeypointName;

      const { x, y } = coordsMemo.current[name];
      const { x: newX, y: newY } = kp;

      // Update positions for the point
      if (x.length < 1 || y.length < 1) {
        for (let i = 0; i < 5; i++) {
          x.push(newX);
          y.push(newY);
        }
      } else {
        x.shift();
        x.push(newX);

        y.shift();
        y.push(newY);
      }

      const avgX = x.reduce((p, c) => p + c, 0) / 5;
      const avgY = y.reduce((p, c) => p + c, 0) / 5;

      prev[name] = { x: avgX, y: avgY };
      return prev;
    }, {} as PoseConfigured);
};

export const detectPose = async (
  detector: PoseDetector,
  video: HTMLVideoElement
) => {
  const poses = await detector.estimatePoses(video);

  if (poses.length > 0) {
    return poses[0];
  }
};
