import { screenOrientationContext } from "@/context/ScreenOrientationContext";
import { useContext } from "react";

export const useScreenOrientation = () => {
  return useContext(screenOrientationContext);
};
