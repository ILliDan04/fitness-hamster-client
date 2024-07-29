import {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";

import { useWebcam } from "@/hooks/useWebcam";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { CANVAS_SIZE } from "@/utils/poseDetection";
import NoCamerasSupported from "./NoCamerasSupported";
import NoCamerasFound from "./NoCamerasFound";
import { cn } from "@/shadcn-lib/utils";

export type VideoCaptureRef = {
  canvas?: HTMLCanvasElement | null;
  video?: HTMLVideoElement | null;
};

type Props = {};

const VideoCapture = forwardRef((_: Props, ref: React.Ref<VideoCaptureRef>) => {
  const { videoHeight } = useBreakpoint();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [started, setStarted] = useState(false);

  const { start, mediaStream, errors, hasError, stop, recording } = useWebcam();

  useImperativeHandle(ref, () => ({
    canvas: canvasRef.current,
    video: videoRef.current,
  }));

  useEffect(() => {
    if (!recording) return;
  }, [recording]);

  useEffect(() => {
    const video = videoRef.current;
    if (!mediaStream || !video) return;

    const cb = async () => {
      video.srcObject = mediaStream;
      await video.play();
    };
    cb();
  }, [mediaStream]);

  useEffect(() => {
    if (recording || started) return;
    start();
    setStarted(true);
  }, [recording, start, stop, started]);

  return (
    <div className="relative" style={{ height: videoHeight }}>
      {errors.noApiExistError && <NoCamerasSupported />}
      {errors.noDeviceFoundError && <NoCamerasFound askCameraAccess={start} />}
      <video
        ref={videoRef}
        playsInline
        className={cn("absolute w-full", hasError ? "hidden" : "")}
        muted
        preload="none"
      />
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE.width}
        height={CANVAS_SIZE.height}
        className={cn("absolute w-full z-10", hasError ? "hidden" : "")}
      />
    </div>
  );
});

export default VideoCapture;
