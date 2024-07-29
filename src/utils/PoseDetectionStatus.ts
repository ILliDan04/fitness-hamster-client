import {
  createDetector,
  Pose,
  PoseDetector,
  SupportedModels,
} from "@tensorflow-models/pose-detection";
import {
  CoordsMemoized,
  defaultCoords,
  PoseConfigured,
  CANVAS_SIZE,
  adjacentKeyPoints,
  KeypointName,
} from "./poseDetection";
import * as tf from "@tensorflow/tfjs";

type Detail = {
  pose: Pose | undefined;
  time: number;
  coords: CoordsMemoized;
  poseConfigured: PoseConfigured;
};

export type PoseChangeEvent = CustomEvent<Detail>;

class PoseDetectionStatus extends EventTarget {
  private static detector: PoseDetector | null = null;

  private _canvas: HTMLCanvasElement;

  private _ctx: CanvasRenderingContext2D | null;
  private _video: HTMLVideoElement;

  private _pose: Pose | undefined;
  private _poseConfigured: PoseConfigured = {};
  private _coords: CoordsMemoized = defaultCoords;

  private _previousTime = 0;
  private _time = 0;

  constructor(canvas: HTMLCanvasElement, video: HTMLVideoElement) {
    super();
    this._ctx = canvas.getContext("2d");
    this._video = video;

    this._canvas = document.createElement("canvas");
    this._canvas.width = CANVAS_SIZE.width;
    this._canvas.height = CANVAS_SIZE.height;
  }

  private emitPoseChangeEvent() {
    this.dispatchEvent(
      new CustomEvent("posechange", {
        detail: {
          pose: this._pose,
          poseConfigured: this._poseConfigured,
          time: this._time,
          coords: this._coords,
        },
      })
    );
  }

  private configurePose() {
    if (!this._pose) return;
    this._poseConfigured = this._pose.keypoints
      .filter((kp) => {
        // Identify the keypoint
        const name = kp.name as KeypointName;

        // Remove old positions of point if it is not found
        if ((kp.score ?? 0) < 0.4) {
          this._coords[name] = { x: [], y: [] };
          return false;
        }

        return true;
      })
      .reduce((prev, kp) => {
        // Identify the keypoint
        const name = kp.name as KeypointName;

        const { x, y } = this._coords[name];
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
  }

  public static async initDetector() {
    if (this.detector) return;

    if (tf.engine().findBackend("webgpu")) {
      await tf.setBackend("webgpu");
    } else if (tf.engine().findBackend("webgl")) {
      await tf.setBackend("webgl");
    } else {
      await tf.setBackend("cpu");
    }
    await tf.ready();

    this.detector = await createDetector(SupportedModels.MoveNet);
  }

  public async detectPose(newCurrentTime: number) {
    if (!PoseDetectionStatus.detector) return;

    try {
      this._canvas
        .getContext("2d")
        ?.drawImage(this._video, 0, 0, this._canvas.width, this._canvas.height);

      const poses = await PoseDetectionStatus.detector.estimatePoses(
        this._canvas
      );
      if (poses.length > 0) {
        this._pose = poses[0];
      }

      this.emitPoseChangeEvent();
    } catch (error) {
      return;
    }

    if (this._previousTime) {
      this._time += newCurrentTime - this._previousTime;
    }
    this._previousTime = newCurrentTime;
  }

  public drawPose(keypointsToExclude?: KeypointName[]) {
    if (!this._ctx || !this._pose) return;

    this.configurePose();

    const ctx = this._ctx;

    ctx.clearRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);

    // Use only specified keypoints
    const filteredKeypoints = Object.entries(this._poseConfigured).filter(
      ([name]) => {
        return (
          !keypointsToExclude ||
          !keypointsToExclude?.includes(name as KeypointName)
        );
      }
    );
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
  }

  public get detector() {
    return PoseDetectionStatus.detector;
  }

  public get time() {
    return this._time;
  }

  public get initialized() {
    return !!PoseDetectionStatus.detector;
  }

  public addEventListener(
    type: "posechange",
    callback: (e: PoseChangeEvent) => void,
    options?: AddEventListenerOptions | boolean
  ): void;
  public addEventListener(
    type: string,
    callback: EventListener | EventListenerObject,
    useCapture?: boolean
  ): void;
  public addEventListener(
    type: string,
    callback:
      | EventListenerOrEventListenerObject
      | ((e: PoseChangeEvent) => void),
    options?: AddEventListenerOptions | boolean
  ): void {
    super.addEventListener(
      type,
      callback as EventListenerOrEventListenerObject,
      options
    );
  }

  public removeEventListener(
    type: "posechange",
    callback: (e: PoseChangeEvent) => void,
    options?: EventListenerOptions | boolean
  ): void;
  public removeEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: EventListenerOptions | boolean
  ): void;
  public removeEventListener(
    type: string,
    callback:
      | EventListenerOrEventListenerObject
      | ((e: PoseChangeEvent) => void)
      | null,
    options?: EventListenerOptions | boolean
  ) {
    super.removeEventListener(
      type,
      callback as EventListenerOrEventListenerObject,
      options
    );
  }
}

export default PoseDetectionStatus;
