import {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";

import { useWebcam } from "@/hooks/useWebcam";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { CANVAS_SIZE } from "@/utils/poseDetection";

export type VideoCaptureRef = {
  canvas?: HTMLCanvasElement | null;
  video?: HTMLVideoElement | null;
};

type Props = {};

const VideoCapture = forwardRef((_: Props, ref: React.Ref<VideoCaptureRef>) => {
  const { width } = useBreakpoint();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const {
    startRecording,
    mediaStream,
    initialized,
    isError,
    error,
    canRecord,
  } = useWebcam();

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
      }
    };
    init();
  }, [initialized, startRecording, canRecord]);

  const containerHeight = useMemo(
    () => (width === "100%" ? "133.333333333vw" : (width * 4) / 3),
    [width]
  );

  return (
    <div>
      <div className="relative" style={{ height: containerHeight }}>
        {!canRecord && (
          <p className="text-yellow-600">
            Please use the default orientation of your device
          </p>
        )}
        {isError && (
          <p
            className="text-red-400 w-full bg-white"
            style={{ height: containerHeight }}
          >
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
  );
});

export default VideoCapture;
