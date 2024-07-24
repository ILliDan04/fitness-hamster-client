import { useScreenOrientation } from "@/hooks/useScreenOrientation";
import { CANVAS_SIZE } from "@/utils/poseDetection";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type WebcamContextType = {
  errors: {
    noApiExistError: boolean;
    noDeviceFoundError: boolean;
    screenAngleError: boolean;
  };
  hasError: boolean;
  mediaStream: MediaStream | null;
  recording: boolean;
  start: () => void;
  stop: () => void;
  aspectRatio: number;
};

const ASPECT_RATIO = 4 / 3;

export const webcamContext = React.createContext<WebcamContextType>({
  aspectRatio: ASPECT_RATIO,
  errors: {
    noApiExistError: false,
    noDeviceFoundError: false,
    screenAngleError: false,
  },
  hasError: false,
  mediaStream: null,
  recording: false,
  start: () => {},
  stop: () => {},
});

const WebcamContext = ({ children }: PropsWithChildren) => {
  const { isPortraitOrientation, angle } = useScreenOrientation();

  // All possible errors
  const [noApiExistError, setNoApiExistError] = useState(false);
  const [noDeviceFoundError, setNoDeviceFoundError] = useState(false);
  const screenAngleError = useMemo(() => angle !== 0, [angle]);
  const hasError = useMemo(
    () => noApiExistError || noDeviceFoundError || screenAngleError,
    [noApiExistError, noDeviceFoundError, screenAngleError]
  );

  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const recording = useMemo(() => !!mediaStream, [mediaStream]);

  const aspectRatio = useMemo(
    () => (isPortraitOrientation ? ASPECT_RATIO : 1 / ASPECT_RATIO),
    [isPortraitOrientation]
  );

  const stopRecording = useCallback(() => {
    if (!mediaStream) return;
    const tracks = mediaStream.getTracks();
    tracks.forEach((track) => track.stop());
    setMediaStream(null);
  }, [mediaStream]);

  const startRecording = useCallback(async () => {
    if (mediaStream?.active) return;

    const mediaDevices = navigator.mediaDevices;
    try {
      const res = await mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: { ideal: "user" },
          width: isPortraitOrientation ? CANVAS_SIZE.height : CANVAS_SIZE.width,
          height: isPortraitOrientation
            ? CANVAS_SIZE.width
            : CANVAS_SIZE.height,
        },
      });
      setNoApiExistError(false);
      setNoDeviceFoundError(false);
      setMediaStream(res);
    } catch (error) {
      setNoDeviceFoundError(true);
      setMediaStream(null);
    }
  }, [mediaStream, isPortraitOrientation]);

  const onDeviceChange = useCallback(() => {
    if (mediaStream?.active) return;
    startRecording();
  }, [startRecording, mediaStream]);

  useEffect(() => {
    if (
      !("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices)
    ) {
      setNoApiExistError(true);
    }

    navigator.mediaDevices.addEventListener("devicechange", onDeviceChange);
    return () =>
      navigator.mediaDevices.removeEventListener(
        "devicechange",
        onDeviceChange
      );
  }, [onDeviceChange]);

  return (
    <webcamContext.Provider
      value={{
        errors: { noApiExistError, noDeviceFoundError, screenAngleError },
        hasError,
        mediaStream,
        recording,
        start: startRecording,
        stop: stopRecording,
        aspectRatio,
      }}
    >
      {children}
    </webcamContext.Provider>
  );
};

export default WebcamContext;
