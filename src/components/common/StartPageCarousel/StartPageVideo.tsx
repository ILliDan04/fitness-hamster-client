import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  video1WebmSrc: string;
  video1HevcSrc: string;
  video2WebmSrc: string;
  video2HevcSrc: string;
};

const StartPageVideo = ({
  video1WebmSrc,
  video1HevcSrc,
  video2WebmSrc,
  video2HevcSrc,
}: Props) => {
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
          className="w-full"
          autoPlay
          muted
          playsInline
          onEnded={() => setFirstVideoEnded(true)}
        >
          <source src={video1HevcSrc} type="video/mp4;codecs=hvc1" />
          <source src={video1WebmSrc} type="video/webm;codecs=vp9" />
        </video>
      )}
      {firstVideoEnded && (
        <video autoPlay loop muted playsInline className="w-full">
          <source src={video2HevcSrc} type="video/mp4;codecs=hvc1" />
          <source src={video2WebmSrc} type="video/webm;codecs=vp9" />
        </video>
      )}
    </div>
  );
};

export default StartPageVideo;
