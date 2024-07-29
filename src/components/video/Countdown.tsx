import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import countdownSvg from "@/assets/exercises/countdown.svg";
import countdownSound from "@/assets/exercises/countdown.mp3";
import { cn } from "@/shadcn-lib/utils";

export type CountdownRef = { run: () => void };

const Countdown = forwardRef<CountdownRef>((_, ref) => {
  const [show, setShow] = useState(false);

  const showAnimation = useCallback(() => setShow(true), []);
  useImperativeHandle(ref, () => ({ run: showAnimation }));

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex justify-center items-center bg-white/40 backdrop-blur-lg invisible opacity-0 transition-opacity duration-200",
        show ? "visible opacity-100" : ""
      )}
    >
      {show && (
        <>
          <img src={countdownSvg} />
          <audio
            src={countdownSound}
            preload="auto"
            autoPlay
            onEnded={() => setShow(false)}
          />
        </>
      )}
    </div>
  );
});

export default Countdown;
