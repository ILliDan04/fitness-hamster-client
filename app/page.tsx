"use client";
import Login from "@/pages/Login";
import VideoCapture from "../components/VideoCapture";
import { ScreenOrientationContext } from "../common/context/ScreenOrientationContext";

export default function Home() {
  return (
    <Login></Login>
    // <ScreenOrientationContext>
    //   <VideoCapture />
    // </ScreenOrientationContext>
  );
}
