import { useCallback, useMemo, useState } from "react";

import { useScreenOrientation } from "./useScreenOrientation";
import { CANVAS_SIZE } from "@/utils/poseDetection";

const ASPECT_RATIO = 4 / 3;

export const useWebcam = () => {
  const { isPortraitOrientation, angle } = useScreenOrientation();

  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const canRecord = useMemo(() => angle === 0, [angle]);

  const aspectRatio = useMemo(
    () => (isPortraitOrientation ? ASPECT_RATIO : 1 / ASPECT_RATIO),
    [isPortraitOrientation]
  );

  const startRecording = useCallback(async () => {
    if (!canRecord) {
      return;
    }

    try {
      if (
        !(
          "mediaDevices" in navigator &&
          "getUserMedia" in navigator.mediaDevices
        )
      ) {
        throw new Error("Browser does not support media recording");
      }

      const response = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: { ideal: "user" },
          width: isPortraitOrientation ? CANVAS_SIZE.height : CANVAS_SIZE.width,
          height: isPortraitOrientation
            ? CANVAS_SIZE.width
            : CANVAS_SIZE.height,
        },
      });

      setMediaStream(response);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }

      setIsError(true);
    }
    setInitialized(true);
  }, [isPortraitOrientation, canRecord]);

  return {
    mediaStream,
    isError,
    initialized,
    startRecording,
    error,
    aspectRatio: aspectRatio,
    canRecord,
  };
};
