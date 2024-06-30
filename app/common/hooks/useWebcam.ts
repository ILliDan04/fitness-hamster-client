import { useCallback, useState } from "react";

export const useWebcam = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isError, setIsError] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const reset = useCallback(() => {
    setMediaStream(null);
    setIsError(false);
    setInitialized(false);
  }, []);

  const startRecording = useCallback(async () => {
    reset();
    try {
      const response = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });
      setMediaStream(response);
    } catch (error) {
      setIsError(true);
    }
    setInitialized(true);
  }, [reset]);

  return { mediaStream, isError, initialized, startRecording };
};
