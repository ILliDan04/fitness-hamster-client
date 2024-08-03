import React from "react";
import StartPageSubtitle from "./StartPageSubtitle";
import sound11Src from "@/assets/start/entrance/1.mp3";
import sound12Src from "@/assets/start/entrance/2.mp3";
import sound13Src from "@/assets/start/entrance/3.mp3";
import sound14Src from "@/assets/start/entrance/4.mp3";
import entranceWebm from "@/assets/start/entrance/video.webm";
import entranceHevc from "@/assets/start/entrance/video.mp4";
import { useAudio } from "@/hooks/useAudio";

const WelcomeToFitton: React.FC = () => {
  const audio11Src = useAudio(sound11Src);
  const audio12Src = useAudio(sound12Src);
  const audio13Src = useAudio(sound13Src);
  const audio14Src = useAudio(sound14Src);

  return (
    <div className="h-full flex justify-between flex-col">
      <h2 className="font-black text-lg text-center">WELCOME TO FITTON!</h2>
      <div className="w-3/5 mx-auto">
        <video loop muted autoPlay playsInline>
          <source src={entranceHevc} type="video/mp4;codecs=hvc1" />
          <source src={entranceWebm} type="video/webm;codecs=vp9" />
        </video>
      </div>
      <StartPageSubtitle
        text={[
          "Hello and welcome to Fitton!",
          "I’m Pavel D, your personal guide and coach",
          "Together, we will make fitness rewarding for everyone no matter your level!",
          "Let’s start this exciting journey together!",
        ]}
        sound={[audio11Src, audio12Src, audio13Src, audio14Src]}
        head={false}
      />
    </div>
  );
};

export default WelcomeToFitton;
