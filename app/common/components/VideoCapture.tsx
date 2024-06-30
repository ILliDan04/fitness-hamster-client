import React, { useRef, useEffect } from "react";

import { useWebcam } from "../hooks/useWebcam";
// import { usePoseDetection } from "../hooks/usePoseDetection";

const VideoCapture = () => {
  const { startRecording, mediaStream, initialized, isError } = useWebcam();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // const detection = usePoseDetection({
  //   video: videoRef.current,
  //   canvas: canvasRef.current,
  // });

  useEffect(() => {
    if (initialized && !isError && videoRef.current) {
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play();
    }
  }, [initialized, isError, mediaStream]);

  useEffect(() => {
    const init = async () => {
      if (!initialized) {
        await startRecording();
        // detection.start();
      }
    };
    init();
  }, [initialized, startRecording]);

  return (
    <div>
      {isError && <p className="text-red-400">Error occured</p>}
      <video ref={videoRef} width="640" height="480" playsInline autoPlay />
      <canvas ref={canvasRef} width="640" height="480" />
    </div>
  );
};

export default VideoCapture;
