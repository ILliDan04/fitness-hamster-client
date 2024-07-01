import { useCallback, useState } from "react";
import { useBreakpoints } from "./useBreakpoints";

export const useWebcam = () => {
  const { containerWidth, ready } = useBreakpoints();

  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const reset = useCallback(() => {
    setMediaStream(null);
    setError("");
    setIsError(false);
    setInitialized(false);
  }, []);

  const startRecording = useCallback(async () => {
    if (!ready) {
      return;
    }

    reset();
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
          facingMode: "user",
          aspectRatio: 0.75,
          width: containerWidth,
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
  }, [containerWidth, reset, ready]);

  return {
    mediaStream,
    isError,
    initialized,
    startRecording,
    error,
    aspectRatio: 0.75,
  };
};
