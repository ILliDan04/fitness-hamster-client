import { useEffect, useMemo, useState } from "react";
import {
  BREAKPOINTS,
  BREAKPOINT_VALUES,
  CONTAINER_SIZE,
} from "../utils/breakpoints";

type Breakpoint = BREAKPOINTS | "DEFAULT";
const getBreakpoint = () => {
  const width = window.innerWidth;
  if (width < BREAKPOINT_VALUES.sm) return "DEFAULT";
  if (width < BREAKPOINT_VALUES.md) return BREAKPOINTS.SMALL;
  if (width < BREAKPOINT_VALUES.lg) return BREAKPOINTS.MEDIUM;
  if (width < BREAKPOINT_VALUES.xl) return BREAKPOINTS.LARGE;
  if (width < BREAKPOINT_VALUES["2xl"]) return BREAKPOINTS.XLARGE;

  return BREAKPOINTS.X2LARGE;
};

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(getBreakpoint);

  useEffect(() => {
    const handleResize = () => setBreakpoint(getBreakpoint());

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  const width = useMemo<number | "100%">(() => {
    if (breakpoint === "DEFAULT") {
      return "100%";
    }
    return CONTAINER_SIZE[breakpoint];
  }, [breakpoint]);

  const videoHeight = useMemo(
    () => (width === "100%" ? "133.333333333vw" : `${(width * 4) / 3}px`),
    [width]
  );

  return { breakpoint, width, videoHeight };
};
