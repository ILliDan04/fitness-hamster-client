import headImg from "@/assets/head.png";
import { cn } from "@/shadcn-lib/utils";
import { useCallback, useRef, useState } from "react";
import Refresh from "../icons/Refresh";
import TypingText from "./TypingText";

type Props = {
  text: string[];
  sound?: HTMLAudioElement[];
  head?: boolean;
};

const StartPageSubtitle = ({ text, sound = [], head = true }: Props) => {
  const wrapper = useRef<HTMLDivElement | null>(null);

  const [repeat, setRepeat] = useState(false);
  const [currIndex, setCurrentIndex] = useState(0);

  const handleClick = useCallback(() => {
    if (repeat) {
      setRepeat(false);
      setCurrentIndex(0);
      return;
    }
    if (currIndex === text.length - 1) {
      setRepeat(true);
      return;
    }
    setCurrentIndex(currIndex + 1);
  }, [currIndex, repeat, text.length]);

  return (
    <div
      className={cn(
        "flex justify-between items-center gap-2",
        head ? "-mt-10" : ""
      )}
      ref={wrapper}
      onClick={text.length > 1 ? handleClick : undefined}
    >
      {!!head && (
        <div className="w-2/5">
          <img src={headImg} />
        </div>
      )}
      <div
        className={cn(
          "p-4 bg-white/20 rounded-3xl mx-auto hover:bg-white/40 cursor-pointer transition-all duration-75 min-h-14",
          head ? "w-full" : "w-4/5",
          repeat ? "flex justify-center items-center" : ""
        )}
      >
        {!repeat && (
          <TypingText
            text={text[currIndex]}
            customTarget={wrapper}
            sound={sound[currIndex]}
          />
        )}
        {repeat && (
          <div className="flex gap-2">
            <Refresh />
            <span>Repeat</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartPageSubtitle;
