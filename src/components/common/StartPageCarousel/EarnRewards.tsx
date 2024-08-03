import React from "react";
import StartPageSubtitle from "./StartPageSubtitle";
import { useAudio } from "@/hooks/useAudio";

import earnRewardsWebm from "@/assets/start/earn-rewards/video.webm";
import earnRewardsHevc from "@/assets/start/earn-rewards/video.mp4";
import sound31Src from "@/assets/start/earn-rewards/1.mp3";
import sound32Src from "@/assets/start/earn-rewards/2.mp3";
import sound33Src from "@/assets/start/earn-rewards/3.mp3";

const EarnRewards: React.FC = () => {
  const audio31Src = useAudio(sound31Src);
  const audio32Src = useAudio(sound32Src);
  const audio33Src = useAudio(sound33Src);

  return (
    <div className="flex justify-between flex-col h-full">
      <h2 className="font-black text-lg text-center mb-7">EARN REWARDS</h2>
      <div className="flex justify-center">
        <video loop muted autoPlay playsInline className="w-full">
          <source src={earnRewardsHevc} type="video/mp4;codecs=hvc1" />
          <source src={earnRewardsWebm} type="video/webm;codecs=vp9" />
        </video>
      </div>
      <StartPageSubtitle
        text={[
          "With Fitton, your can improve your body while earning points that can be exchanged for real money",
          "Join a squad or compete in leagues. The higher your league, the better the rewards!",
          "Turn your fitness journey into a rewarding adventure with Fitton!",
        ]}
        sound={[audio31Src, audio32Src, audio33Src]}
      />
    </div>
  );
};

export default EarnRewards;
