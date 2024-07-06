import {
  Keypoint,
  Pose,
  PoseDetector,
  SupportedModels,
  util,
} from "@tensorflow-models/pose-detection";

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

const drawPose = (
  pose: Pose,
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement
) => {
  ctx!.clearRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
  ctx!.drawImage(video, 0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);

  pose.keypoints.forEach(({ x, y, score }) => {
    if (score && score > 0.5) {
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
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
};

export const detectSquats = (
  pose: Pose,
  repInProgress: boolean,
  onSquatDetected: () => void,
  onSquatFinished: () => void
) => {
  const leftHip = pose.keypoints.find(({ name }) => name === "left_hip");
  if (!leftHip || (leftHip.score ?? 0) < 0.5) return;

  const rightHip = pose.keypoints.find(({ name }) => name === "right_hip");
  if (!rightHip || (rightHip.score ?? 0) < 0.5) return;

  const leftKnee = pose.keypoints.find(({ name }) => name === "left_knee");
  if (!leftKnee || (leftKnee.score ?? 0) < 0.5) return;

  const rightKnee = pose.keypoints.find(({ name }) => name === "right_knee");
  if (!rightKnee || (rightKnee.score ?? 0) < 0.5) return;

  const leftAnkle = pose.keypoints.find(({ name }) => name === "left_ankle");
  if (!leftAnkle || (leftAnkle.score ?? 0) < 0.5) return;

  const rightAnkle = pose.keypoints.find(({ name }) => name === "right_ankle");
  if (!rightAnkle || (rightAnkle.score ?? 0) < 0.5) return;

  const rightAngle = calculateAngle(rightAnkle, rightKnee, rightHip);
  const leftAngle = calculateAngle(leftAnkle, leftKnee, leftHip);

  // Squat is done when both legs have angle less than 90
  if (leftAngle < 90 && rightAngle < 90 && !repInProgress) {
    onSquatDetected();
    // Squat is finished when both legs have angle greater than 160
  } else if (leftAngle > 160 && rightAngle > 160 && repInProgress) {
    onSquatFinished();
  }
};

export const detectPose = async (
  detector: PoseDetector,
  video: HTMLVideoElement,
  ctx: CanvasRenderingContext2D
) => {
  const poses = await detector!.estimatePoses(video);

  if (poses.length > 0) {
    const pose = poses[0];
    drawPose(pose, ctx, video);
    return pose;
  }
};
