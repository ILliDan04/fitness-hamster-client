import { soundContext } from "@/context/SoundContext";
import { useContext } from "react";

export const useSound = () => useContext(soundContext);
