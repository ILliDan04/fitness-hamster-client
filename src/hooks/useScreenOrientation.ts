import { useEffect, useState } from "react";

export const useScreenOrientation = () => {
  const [isPortraitOrientation, setIsPortraitOrientation] = useState(
    window.screen.orientation.type.includes("portrait")
  );
  const [angle, setAngle] = useState(window.screen.orientation.angle);

  useEffect(() => {
    const handleOrientationChange = () => {
      setAngle(window.screen.orientation.angle);
      setIsPortraitOrientation(
        window.screen.orientation.type.includes("portrait")
      );
    };

    window.screen.orientation.addEventListener(
      "change",
      handleOrientationChange
    );

    handleOrientationChange();

    return () => {
      window.screen.orientation.removeEventListener(
        "change",
        handleOrientationChange
      );
    };
  }, []);

  return { isPortraitOrientation, angle };
};
