import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselSteps,
} from "@/shadcn-components/ui/carousel";
import StartPageSubtitle from "./StartPageSubtitle";
import { memo } from "react";
import ArrowBack from "../icons/ArrowBack";
import ArrowNext from "../icons/ArrowNext";
import { Button } from "@/shadcn-components/ui/button";
import { useAuth } from "@/hooks/useAuth";

import sound11Src from "@/assets/start/1.1.mp3";
import sound12Src from "@/assets/start/1.2.mp3";
import sound13Src from "@/assets/start/1.3.mp3";
import sound14Src from "@/assets/start/1.4.mp3";

import sound21Src from "@/assets/start/2.1.mp3";
import sound22Src from "@/assets/start/2.2.mp3";
import sound23Src from "@/assets/start/2.3.mp3";
import sound24Src from "@/assets/start/2.4.mp3";

import sound31Src from "@/assets/start/3.1.mp3";
import sound32Src from "@/assets/start/3.2.mp3";
import sound33Src from "@/assets/start/3.3.mp3";

import sound41Src from "@/assets/start/4.1.mp3";
import sound42Src from "@/assets/start/4.2.mp3";
import sound43Src from "@/assets/start/4.3.mp3";
import StartPageVideo from "./StartPageVideo";

import entranceSrc from "@/assets/start/entrance.webm";
import howFittonWorksWebm1 from "@/assets/start/how_fitton_works_1.webm";
import howFittonWorksWebm2 from "@/assets/start/how_fitton_works_2.webm";
import earnRewardsWebm from "@/assets/start/earn_rewards.webm";
import { useAudio } from "@/hooks/useAudio";

const StartPageCarousel = () => {
  const { signIn } = useAuth();

  const audio11Src = useAudio(sound11Src);
  const audio12Src = useAudio(sound12Src);
  const audio13Src = useAudio(sound13Src);
  const audio14Src = useAudio(sound14Src);

  const audio21Src = useAudio(sound21Src);
  const audio22Src = useAudio(sound22Src);
  const audio23Src = useAudio(sound23Src);
  const audio24Src = useAudio(sound24Src);

  const audio31Src = useAudio(sound31Src);
  const audio32Src = useAudio(sound32Src);
  const audio33Src = useAudio(sound33Src);

  const audio41Src = useAudio(sound41Src);
  const audio42Src = useAudio(sound42Src);
  const audio43Src = useAudio(sound43Src);

  return (
    <>
      <Carousel noScroll>
        <CarouselContent>
          <CarouselItem>
            <div className="h-full">
              <h2 className="font-black text-lg text-center">
                WELCOME TO FITTON!
              </h2>
              <div>
                <video
                  src={entranceSrc}
                  className="w-3/5 mx-auto"
                  loop
                  autoPlay
                />
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
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-between flex-col h-full">
              <h2 className="font-black text-lg text-center mb-7">
                HOW FITTON WORKS
              </h2>
              <div className="pl-7 flex justify-center">
                <StartPageVideo
                  video1Src={howFittonWorksWebm1}
                  video2Src={howFittonWorksWebm2}
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
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-between flex-col h-full">
              <h2 className="font-black text-lg text-center mb-7">
                EARN REWARDS
              </h2>
              <div className="flex justify-center">
                <video src={earnRewardsWebm} loop autoPlay className="w-full" />
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
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-between flex-col h-full">
              <h2 className="font-black text-lg text-center mb-7">
                READY TO START?
              </h2>
              <div className="">
                <div>
                  <Button
                    onClick={() => signIn("ton")}
                    variant="red"
                    size="lg"
                    className="mx-auto"
                  >
                    Get early access
                  </Button>
                </div>
              </div>
              <StartPageSubtitle
                text={[
                  "Are you ready to take the first step towards a healthier you?",
                  "Join our fitness community today and start earning rewards while pushing your limits!",
                  "Click the button below to begin your journey",
                ]}
                sound={[audio41Src, audio42Src, audio43Src]}
              />
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselSteps />
        <div className="flex justify-between mt-4">
          <CarouselPrevious variant="red" icon={<ArrowBack className="mr-2" />}>
            Back
          </CarouselPrevious>
          <CarouselNext variant="red" icon={<ArrowNext className="mr-2" />}>
            Next
          </CarouselNext>
        </div>
      </Carousel>
    </>
  );
};

export default memo(StartPageCarousel);
