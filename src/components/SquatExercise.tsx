import { usePoseDetection } from "@/hooks/usePoseDetection";
import { useEffect, useRef } from "react";
import VideoCapture, { VideoCaptureRef } from "./VideoCapture";

const SquatExercise = () => {
  const videoCapture = useRef<VideoCaptureRef | null>(null);
  const detection = usePoseDetection({
    video: videoCapture.current?.video,
    canvas: videoCapture.current?.canvas,
    exerciseToDetect: "squats",
  });

  useEffect(() => {
    detection.start();
  }, [detection]);

  return <VideoCapture ref={videoCapture} />;
};

export default SquatExercise;
