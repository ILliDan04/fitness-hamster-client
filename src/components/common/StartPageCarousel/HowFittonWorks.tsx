import React from "react";

import howFittonWorksWebm1 from "@/assets/start/how-fitton-works/video1.webm";
import howFittonWorksHevc1 from "@/assets/start/how-fitton-works/video1.mp4";
import howFittonWorksWebm2 from "@/assets/start/how-fitton-works/video2.webm";
import howFittonWorksHevc2 from "@/assets/start/how-fitton-works/video2.mp4";
import sound21Src from "@/assets/start/how-fitton-works/1.mp3";
import sound22Src from "@/assets/start/how-fitton-works/2.mp3";
import sound23Src from "@/assets/start/how-fitton-works/3.mp3";
import sound24Src from "@/assets/start/how-fitton-works/4.mp3";
import { useAudio } from "@/hooks/useAudio";
import StartPageVideo from "./StartPageVideo";
import StartPageSubtitle from "./StartPageSubtitle";

const HowFittonWorks: React.FC = () => {
  const audio21Src = useAudio(sound21Src);
  const audio22Src = useAudio(sound22Src);
  const audio23Src = useAudio(sound23Src);
  const audio24Src = useAudio(sound24Src);

  return (
    <div className="flex justify-between flex-col h-full">
      <h2 className="font-black text-lg text-center mb-7">HOW FITTON WORKS</h2>
      <div className="pl-7 flex justify-center">
        <StartPageVideo
          video1WebmSrc={howFittonWorksWebm1}
          video1HevcSrc={howFittonWorksHevc1}
          video2WebmSrc={howFittonWorksWebm2}
          video2HevcSrc={howFittonWorksHevc2}
        />
      </div>
      <StartPageSubtitle
        text={[
          "Fitton uses AI to make your workouts effective",
          "Just point your phone’s camera, and our AI will provide real-time feedback!",
          "Let’s try a simple squat",
          "Follow my lead and watch the progress bar to ensure you’re doing it right!",
        ]}
        sound={[audio21Src, audio22Src, audio23Src, audio24Src]}
      />
    </div>
  );
};

export default HowFittonWorks;
