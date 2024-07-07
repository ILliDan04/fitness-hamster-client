import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";

import { useWebcam } from "@/hooks/useWebcam";
import { CANVAS_SIZE } from "@/hooks/usePoseDetection";

export type VideoCaptureRef = {
  canvas?: HTMLCanvasElement | null;
  video?: HTMLVideoElement | null;
};

type Props = {};

const VideoCapture = forwardRef((_: Props, ref: React.Ref<VideoCaptureRef>) => {
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
  // const detection = usePoseDetection({
  //   video: videoRef.current,
  //   canvas: canvasRef.current,
  //   exerciseToDetect,
  // });
  useImperativeHandle(ref, () => ({
    canvas: canvasRef.current,
    video: videoRef.current,
  }));

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
        // detection.start();
      }
    };
    init();
  }, [initialized, startRecording, canRecord]);

  return (
    <div>
      <div className="container">
        <div className="relative">
          {!canRecord && ready && (
            <p className="text-yellow-600">
              Please use the default orientation of your device
            </p>
          )}
          {isError && (
            <p className="text-red-400 w-full h-[133.3333333vw] bg-white">
              {error}
            </p>
          )}
          <video
            ref={videoRef}
            playsInline
            className={`absolute w-full ${isError ? "hidden" : ""}`}
            muted
            preload="none"
          />
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE.width}
            height={CANVAS_SIZE.height}
            className={`absolute w-full z-10 ${isError ? "hidden" : ""}`}
          />
        </div>
      </div>
    </div>
  );
});

export default VideoCapture;
