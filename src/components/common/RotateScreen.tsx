import { useScreenOrientation } from "@/hooks/useScreenOrientation";
import React from "react";
import Rotate90 from "../icons/Rotate90";
import Rotate180 from "../icons/Rotate180";
import Rotate270 from "../icons/Rotate270";

const RotateScreen: React.FC = () => {
  const { angle } = useScreenOrientation();

  return angle === 0 ? null : (
    <div className="absolute inset-0 bg-blue-950 z-10  flex justify-center items-center flex-col">
      <div className="mb-6">
        {angle === 90 ? (
          <Rotate90 />
        ) : angle === 180 ? (
          <Rotate180 />
        ) : (
          <Rotate270 />
        )}
      </div>
      <p className="text-white uppercase font-extrabold text-xl">
        Please, rotate your device
      </p>
    </div>
  );
};

export default RotateScreen;
