import { useMemo } from "react";
import { useScreenOrientation } from "../context/ScreenOrientationContext";
import {
  BREAKPOINTS,
  BREAKPOINT_VALUES,
  CONTAINER_SIZE,
} from "../utils/breakpoints";

export const useBreakpoints = () => {
  const { screenWidth, ready } = useScreenOrientation();

  const breakpoint = useMemo(() => {
    if (screenWidth < BREAKPOINT_VALUES.sm) {
      return "DEFAULT";
    }
    if (screenWidth < BREAKPOINT_VALUES.md) {
      return BREAKPOINTS.SMALL;
    }
    if (screenWidth < BREAKPOINT_VALUES.lg) {
      return BREAKPOINTS.MEDIUM;
    }
    if (screenWidth < BREAKPOINT_VALUES.xl) {
      return BREAKPOINTS.LARGE;
    }
    if (screenWidth < BREAKPOINT_VALUES["2xl"]) {
      return BREAKPOINTS.XLARGE;
    }
    return BREAKPOINTS.X2LARGE;
  }, [screenWidth]);

  const breakpointValue = useMemo(() => {
    if (breakpoint === "DEFAULT") {
      return screenWidth;
    }
    return BREAKPOINT_VALUES[breakpoint];
  }, [breakpoint, screenWidth]);

  const containerWidth = useMemo(() => {
    if (breakpoint === "DEFAULT") {
      return screenWidth;
    }
    return CONTAINER_SIZE[breakpoint];
  }, [breakpoint, screenWidth]);

  return { breakpoint, breakpointValue, containerWidth, ready };
};
