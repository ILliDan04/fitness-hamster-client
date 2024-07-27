import { useMemo } from "react";

export const useAudio = (
  path: string,
  config?: (audio: HTMLAudioElement) => void
) => {
  return useMemo(() => {
    const audio = new Audio(path);
    audio.preload = "auto";
    config?.(audio);
    return audio;
  }, [path, config]);
};
