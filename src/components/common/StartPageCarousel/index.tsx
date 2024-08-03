import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselSteps,
} from "@/shadcn-components/ui/carousel";
import { memo } from "react";
import ArrowNext from "@/components/icons/ArrowNext";
import ArrowBack from "@/components/icons/ArrowBack";
import WelcomeToFitton from "./WelcomeToFitton";
import HowFittonWorks from "./HowFittonWorks";
import EarnRewards from "./EarnRewards";
import ReadyToStart from "./ReadyToStart";

const StartPageCarousel = () => {
  return (
    <Carousel noScroll>
      <CarouselContent>
        <CarouselItem>
          <WelcomeToFitton />
        </CarouselItem>
        <CarouselItem>
          <HowFittonWorks />
        </CarouselItem>
        <CarouselItem>
          <EarnRewards />
        </CarouselItem>
        <CarouselItem>
          <ReadyToStart />
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
  );
};

export default memo(StartPageCarousel);
