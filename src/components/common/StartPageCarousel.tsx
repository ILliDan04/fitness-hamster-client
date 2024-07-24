import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselSteps,
} from "@/shadcn-components/ui/carousel";
import headBigImg from "@/assets/head_big.png";
import howFittonWorksImg from "@/assets/how_fitton_works.png";
import earnRewardsImg from "@/assets/earn_rewards.png";
import StartPageSubtitle from "./StartPageSubtitle";
import { memo } from "react";

import sound11Src from "@/assets/sound/1.1.mp3";
import sound12Src from "@/assets/sound/1.2.mp3";
import sound13Src from "@/assets/sound/1.3.mp3";
import sound14Src from "@/assets/sound/1.4.mp3";

import sound21Src from "@/assets/sound/2.1.mp3";
import sound22Src from "@/assets/sound/2.2.mp3";
import sound23Src from "@/assets/sound/2.3.mp3";
import sound24Src from "@/assets/sound/2.4.mp3";

import sound31Src from "@/assets/sound/3.1.mp3";
import sound32Src from "@/assets/sound/3.2.mp3";
import sound33Src from "@/assets/sound/3.3.mp3";

import sound41Src from "@/assets/sound/4.1.mp3";
import sound42Src from "@/assets/sound/4.2.mp3";
import sound43Src from "@/assets/sound/4.3.mp3";

const StartPageCarousel = () => {
  return (
    <>
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div className="h-full">
              <h2 className="font-black text-lg text-center mb-7">
                WELCOME TO FITTON!
              </h2>
              <div className="">
                <img src={headBigImg} className="w-3/5 mx-auto" />
              </div>
              <StartPageSubtitle
                text={[
                  "Hello and welcome to Fitton!",
                  "I’m Pavel D, your personal guide and coach",
                  "Together, we will make fitness rewarding for everyone no matter your level!",
                  "Let’s start this exciting journey together!",
                ]}
                sound={[
                  new Audio(sound11Src),
                  new Audio(sound12Src),
                  new Audio(sound13Src),
                  new Audio(sound14Src),
                ]}
                head={false}
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-between flex-col h-full">
              <h2 className="font-black text-lg text-center mb-7">
                HOW FITTON WORKS
              </h2>
              <div className="pl-7">
                <img src={howFittonWorksImg} className="" />
              </div>
              <StartPageSubtitle
                text={[
                  "Fitton uses AI to make your workouts effective",
                  "Just point your phone’s camera, and our AI will provide real-time feedback!",
                  "Let’s try a simple squat",
                  "Follow my lead and watch the progress bar to ensure you’re doing it right!",
                ]}
                sound={[
                  new Audio(sound21Src),
                  new Audio(sound22Src),
                  new Audio(sound23Src),
                  new Audio(sound24Src),
                ]}
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-between flex-col h-full">
              <h2 className="font-black text-lg text-center mb-7">
                EARN REWARDS
              </h2>
              <div className="pl-7">
                <img src={earnRewardsImg} className="" />
              </div>
              <StartPageSubtitle
                text={[
                  "With Fitton, your can improve your body while earning points that can be exchanged for real money",
                  "Join a squad or compete in leagues. The higher your league, the better the rewards!",
                  "Turn your fitness journey into a rewarding adventure with Fitton!",
                ]}
                sound={[
                  new Audio(sound31Src),
                  new Audio(sound32Src),
                  new Audio(sound33Src),
                ]}
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-between flex-col h-full">
              <h2 className="font-black text-lg text-center mb-7">
                EARN REWARDS
              </h2>
              <div className="pl-7">
                <img src={earnRewardsImg} className="" />
              </div>
              <StartPageSubtitle
                text={[
                  "Are you ready to take the first step towards a healthier you?",
                  "Join our fitness community today and start earning rewards while pushing your limits!",
                  "Click the button below to begin your journey",
                ]}
                sound={[
                  new Audio(sound41Src),
                  new Audio(sound42Src),
                  new Audio(sound43Src),
                ]}
              />
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselSteps />
      </Carousel>
    </>
  );
};

export default memo(StartPageCarousel);
