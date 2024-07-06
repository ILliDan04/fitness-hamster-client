"use client";

import React, { useRef, useEffect } from "react";

import { useWebcam } from "../common/hooks/useWebcam";
import {
  CANVAS_SIZE,
  usePoseDetection,
} from "../common/hooks/usePoseDetection";

const VideoCapture = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const {
    startRecording,
    mediaStream,
    initialized,
    isError,
    error,
    canRecord,
    ready,
  } = useWebcam();
  const detection = usePoseDetection({
    video: videoRef.current,
    canvas: canvasRef.current,
    exerciseToDetect: "squats",
  });

  useEffect(() => {
    if (initialized && !isError && videoRef.current) {
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play();
    }
  }, [initialized, isError, mediaStream]);

  useEffect(() => {
    const init = async () => {
      if (!initialized && canRecord) {
        await startRecording();
        detection.start();
      }
    };
    init();
  }, [initialized, detection, startRecording, canRecord]);

  return (
    <div>
      <div className="container">
        <div className="relative">
          {!canRecord && ready && (
            <p className="text-yellow-600">
              Please use the default orientation of your device
            </p>
          )}
          {<p className="text-7xl">{detection.totalReps}</p>}
          {isError && <p className="text-red-400">{error}</p>}
          <video
            ref={videoRef}
            playsInline
            className="absolute w-full"
            muted
            preload="none"
          />
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE.width}
            height={CANVAS_SIZE.height}
            className="absolute z-10 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCapture;
