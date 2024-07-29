import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  video1Src: string;
  video2Src: string;
};

const StartPageVideo = ({ video1Src, video2Src }: Props) => {
  const [canShow, setCanShow] = useState(false);
  const [firstVideoEnded, setFirstVideoEnded] = useState(false);
  const wrapper = useRef<HTMLDivElement | null>(null);

  const onIntersect = useCallback<IntersectionObserverCallback>((e) => {
    if (e[0].isIntersecting) {
      setCanShow(true);
    }
  }, []);

  useEffect(() => {
    const target = wrapper.current;
    if (!target) return;

    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      threshold: 1,
      rootMargin: "0px",
    });

    observer.observe(target);
    return () => observer.unobserve(target);
  }, [onIntersect]);

  return (
    <div ref={wrapper} className="w-full">
      {canShow && !firstVideoEnded && (
        <video
          src={video1Src}
          className="w-full"
          autoPlay
          onEnded={() => setFirstVideoEnded(true)}
        />
      )}
      {firstVideoEnded && (
        <video src={video2Src} autoPlay loop className="w-full" />
      )}
    </div>
  );
};

export default StartPageVideo;
