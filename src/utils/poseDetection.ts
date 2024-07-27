import { Keypoint } from "@tensorflow-models/pose-detection";

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

export const CANVAS_SIZE = {
  width: 600,
  height: 800,
};

export const calculateAngle = (a: Keypoint, b: Keypoint, c: Keypoint) => {
  const arg =
    Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  const angle = (Math.abs(arg) / Math.PI) * 180;
  return angle > 180 ? 360 - angle : angle;
};
