import { useContext } from "react";
import { webcamContext } from "@/context/WebcamContext";

export const useWebcam = () => {
  return useContext(webcamContext);
};
