"use client";
import VideoCapture from "./common/components/VideoCapture";
import { ScreenOrientationContext } from "./common/context/ScreenOrientationContext";

export default function Home() {
  return (
    <ScreenOrientationContext>
      <VideoCapture />
    </ScreenOrientationContext>
  );
}
