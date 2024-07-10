import { usePoseDetection } from "@/hooks/usePoseDetection";
import { useEffect, useRef } from "react";
import VideoCapture, { VideoCaptureRef } from "./VideoCapture";

const SquatExercise = () => {
  const videoCapture = useRef<VideoCaptureRef | null>(null);
  const { start, totalReps, progress } = usePoseDetection({
    video: videoCapture.current?.video,
    canvas: videoCapture.current?.canvas,
    exerciseToDetect: "squats",
  });

  useEffect(() => {
    start();
  }, [start]);

  return (
    <div className="container">
      <VideoCapture ref={videoCapture} />
      <p className="text-4xl text-white">{totalReps}</p>
      <p className="text-4xl text-white text-end">{progress}</p>
    </div>
  );
};

export default SquatExercise;
