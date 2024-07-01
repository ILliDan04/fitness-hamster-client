"use client";

import React, { useRef, useEffect, useMemo } from "react";

import { useWebcam } from "../hooks/useWebcam";
import { usePoseDetection } from "../hooks/usePoseDetection";
import { useBreakpoints } from "../hooks/useBreakpoints";

const VideoCapture = () => {
  const {
    startRecording,
    mediaStream,
    initialized,
    isError,
    error,
    aspectRatio,
  } = useWebcam();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { containerWidth, ready } = useBreakpoints();
  const detection = usePoseDetection({
    video: videoRef.current,
    canvas: canvasRef.current,
  });

  useEffect(() => {
    const init = async () => {
      try {
        // @ts-ignore
        await screen.orientation.lock("any");
      } catch (error) {}
    };
    init();
  }, []);

  useEffect(() => {
    if (initialized && !isError && videoRef.current) {
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play();
    }
  }, [initialized, isError, mediaStream]);

  useEffect(() => {
    const init = async () => {
      if (!initialized && ready) {
        await startRecording();
        detection.start();
      }
    };
    init();
  }, [initialized, detection, startRecording, ready]);

  return useMemo(
    () => (
      <div className="container relative">
        {isError && <p className="text-red-400">{error}</p>}
        <video
          ref={videoRef}
          width={containerWidth}
          height={containerWidth / aspectRatio}
          playsInline
          className="absolute"
          autoPlay
        />
        <canvas
          ref={canvasRef}
          width={containerWidth}
          height={containerWidth / aspectRatio}
          className="absolute z-10"
        />
      </div>
    ),
    [aspectRatio, containerWidth, error, isError]
  );
};

export default VideoCapture;
