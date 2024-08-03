import React from "react";
import { useAudio } from "@/hooks/useAudio";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/shadcn-components/ui/button";

import sound41Src from "@/assets/start/ready-to-start/1.mp3";
import sound42Src from "@/assets/start/ready-to-start/2.mp3";
import sound43Src from "@/assets/start/ready-to-start/3.mp3";

import readyToStartWebm from "@/assets/start/ready-to-start/video.webm";
import readyToStartHevc from "@/assets/start/ready-to-start/video.mp4";
import StartPageSubtitle from "./StartPageSubtitle";

const ReadyToStart: React.FC = () => {
  const { signIn } = useAuth();

  const audio41Src = useAudio(sound41Src);
  const audio42Src = useAudio(sound42Src);
  const audio43Src = useAudio(sound43Src);

  return (
    <div className="flex justify-between flex-col h-full">
      <h2 className="font-black text-lg text-center mb-7">READY TO START?</h2>
      <div className="w-2/5 mx-auto">
        <video loop muted autoPlay playsInline className="w-full">
          <source src={readyToStartHevc} type="video/mp4;codecs=hvc1" />
          <source src={readyToStartWebm} type="video/webm;codecs=vp9" />
        </video>
      </div>
      <Button
        onClick={() => signIn("ton")}
        variant="red"
        size="lg"
        className="mx-auto mb-8 mt-2"
      >
        Get early access
      </Button>
      <StartPageSubtitle
        text={[
          "Are you ready to take the first step towards a healthier you?",
          "Join our fitness community today and start earning rewards while pushing your limits!",
          "Click the button below to begin your journey",
        ]}
        sound={[audio41Src, audio42Src, audio43Src]}
        head={false}
      />
    </div>
  );
};

export default ReadyToStart;
