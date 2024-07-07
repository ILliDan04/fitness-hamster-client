import React, { PropsWithChildren, useEffect, useState } from "react";

type ScreenOrientationContextType = {
  ready: boolean;
  screenWidth: number;
  isPortraitOrientation: boolean;
  angle: number;
};

export const screenOrientationContext =
  React.createContext<ScreenOrientationContextType>({
    ready: false,
    screenWidth: 0,
    isPortraitOrientation: false,
    angle: 0,
  });

export const ScreenOrientationContext = ({ children }: PropsWithChildren) => {
  const [appWindow, setAppWindow] = useState<Window | null>(null);
  const [isPortraitOrientation, setIsPortraitOrientation] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      const target = e.target as Window;
      setScreenWidth(target.innerWidth);
    });

    window.screen.orientation.addEventListener("change", (e) => {
      const target = e.target as ScreenOrientation;
      setAngle(target.angle);
      setIsPortraitOrientation(target.type.includes("portrait"));
    });

    setAppWindow(window);

    setScreenWidth(window.innerWidth);

    setAngle(window.screen.orientation.angle);
    setIsPortraitOrientation(
      window.screen.orientation.type.includes("portrait")
    );
  }, []);

  return (
    <screenOrientationContext.Provider
      value={{
        ready: !!appWindow,
        isPortraitOrientation,
        screenWidth,
        angle,
      }}
    >
      {children}
    </screenOrientationContext.Provider>
  );
};
