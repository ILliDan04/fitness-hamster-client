import { useCallback, useEffect, useRef, useState } from "react";
import VideoCapture, { VideoCaptureRef } from "../video/VideoCapture";
import ExercisePanel from "./ExercisePanel";
import { usePoseDetection } from "@/hooks/usePoseDetection";
import {
  calculateAngle,
  KeypointName,
  PoseConfigured,
} from "@/utils/poseDetection";
import ExerciseStatus from "@/utils/ExerciseStatus";
import { cn } from "@/shadcn-lib/utils";
import Tick from "../icons/Tick";
import { useNavigate } from "@tanstack/react-router";
import { PoseChangeEvent } from "@/utils/PoseDetectionStatus";
import LoadingFullScreen from "../common/LoadingFullScreen";
import ExerciseContext from "@/context/ExerciseContext";
import { useWebcam } from "@/hooks/useWebcam";
import Countdown, { CountdownRef } from "../video/Countdown";

type Props = {
  onDone?: () => Promise<void>;
};

const SquatExercise = ({ onDone }: Props) => {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  const videoCapture = useRef<VideoCaptureRef | null>(null);
  const countdown = useRef<CountdownRef | null>(null);
  const status = useRef(new ExerciseStatus());

  const [startedDetecting, setStartedDetecting] = useState(false);

  const detection = usePoseDetection({
    canvas: videoCapture.current?.canvas,
    video: videoCapture.current?.video,
  });
  const { recording } = useWebcam();

  const detectSquats = useCallback(
    (poseConfigured: PoseConfigured) => {
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
      if (
        leftAngle < 110 &&
        rightAngle < 110 &&
        !status.current.repInProgress
      ) {
        status.current.setRepInProgress(true);
        // Squat is finished when both legs have angle greater than 160
      } else if (
        leftAngle > 160 &&
        rightAngle > 160 &&
        status.current.repInProgress
      ) {
        status.current.setRepInProgress(false);
        status.current.setReps(status.current.reps + 1);
      }

      status.current.setProgress(
        Math.round(
          Math.min(100, (10 / 7) * (180 - Math.max(leftAngle, rightAngle, 110)))
        )
      );
    },
    [status]
  );

  const poseChange = useCallback(
    (e: PoseChangeEvent) => {
      setStartedDetecting(true);
      const { time, poseConfigured } = e.detail;
      status.current.setTime(time);
      detectSquats(poseConfigured);
    },
    [detectSquats, status]
  );

  const repsChange = useCallback((e: CustomEvent<number>) => {
    if (e.detail === 20) {
      setCompleted(true);
    }
  }, []);

  useEffect(() => {
    if (!recording || !startedDetecting) return;
    countdown.current?.run();
  }, [recording, startedDetecting]);

  useEffect(() => {
    const target = status.current;

    target.addEventListener("repschange", repsChange);
    return () => target.removeEventListener("repschange", repsChange);
  }, [repsChange, status]);

  useEffect(() => {
    if (!detection) return;

    detection.addEventListener("posechange", poseChange);
    return () => detection.removeEventListener("posechange", poseChange);
  }, [detection, poseChange]);

  useEffect(() => {
    if (!completed) return;
    const cb = async () => {
      await onDone?.();
      setTimeout(() => navigate({ to: "/home", from: "/exercise/$id" }), 2000);
    };
    cb();
  }, [completed, navigate, onDone]);

  return (
    <div className="h-fill bg-blue-gradient">
      <LoadingFullScreen loading={!detection?.initialized} />
      <Countdown ref={countdown} />
      <div
        className={cn(
          "fixed inset-0 bg-lime-500 z-50 justify-center items-center transition-opacity duration-300 ease-in-out opacity-0 invisible",
          completed ? "visible flex opacity-100" : ""
        )}
      >
        <Tick size="huge" color="white" />
      </div>
      <ExerciseContext value={{ exercise: status.current, detection }}>
        <VideoCapture ref={videoCapture} />
        <ExercisePanel maxReps={20} exerciseName="Squats" />
      </ExerciseContext>
    </div>
  );
};

export default SquatExercise;
