import { useSound } from "@/hooks/useSound";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  sound?: HTMLAudioElement;
  className?: string;
  customTarget?: React.MutableRefObject<Element | null>;
};

const TypingText = ({ text, className, customTarget, sound }: Props) => {
  const { on } = useSound();
  const renderElem = useRef<HTMLSpanElement | null>(null);
  const intervalRef = useRef(0);

  const [audioStarted, setAudioStarted] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const [finished, setFinished] = useState(false);
  const [index, setIndex] = useState(0);
  const [resultingText, setResultingText] = useState("");

  const reset = useCallback(() => {
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
    setIndex(0);
    setResultingText("");
    setFinished(false);
    setAudioStarted(false);
  }, [sound]);

  const printCB = useCallback(() => {
    if (index === text.length) {
      setFinished(true);
      clearInterval(intervalRef.current);
      return;
    }

    setResultingText((t) => `${t}${text[index]}`);
    setIndex(index + 1);
  }, [index, text]);

  const observerCb = useCallback<IntersectionObserverCallback>(
    (entries) => {
      const entry = entries[0];
      setCanRender(entry.isIntersecting);
      if (!entry.isIntersecting && !finished) {
        reset();
      }
    },
    [reset, finished]
  );

  useEffect(() => {
    if (!sound) return;
    if (on) {
      sound.volume = 1;
      return;
    }
    sound.volume = 0;
  }, [on, sound]);

  useEffect(() => {
    if (!sound || audioStarted || !canRender) return;

    const fn = async () => {
      await sound?.play();
      setAudioStarted(true);
    };

    fn();
  }, [audioStarted, canRender, sound]);

  useEffect(() => {
    if (!renderElem.current && !customTarget) return;

    const target = (customTarget?.current ?? renderElem?.current) as Element;

    const observer = new IntersectionObserver(observerCb, {
      root: null,
      threshold: 0.9,
      rootMargin: "0px",
    });

    observer.observe(target);
    return () => observer.unobserve(target);
  }, [renderElem, observerCb, customTarget]);

  useEffect(() => {
    return reset;
  }, [text, reset]);

  useEffect(() => {
    if (!canRender) return;
    intervalRef.current = setInterval(printCB, 40) as unknown as number;
    return () => clearInterval(intervalRef.current);
  }, [printCB, canRender]);

  return (
    <span className={className} ref={renderElem}>
      {resultingText}
    </span>
  );
};

export default TypingText;
