import { useBreakpoint } from "@/hooks/useBreakpoint";
import RepsCounter from "./RepsCounter";
import ExerciseProgress from "./ExerciseProgress";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/shadcn-components/ui/button";
import Cross from "../icons/Cross";
import { useNavigate } from "@tanstack/react-router";
import { useWebcam } from "@/hooks/useWebcam";
import SoundOff from "../icons/SoundOff";
import colors from "tailwindcss/colors";
import useExercise from "@/hooks/useExercise";
import repSoundSrc from "@/assets/sound/repetition.mp3";
import ExerciseInfo from "./ExerciseInfo";
import { useAudio } from "@/hooks/useAudio";

type Props = {
  maxReps: number;
  exerciseName: string;
};

const ExercisePanel = ({ maxReps, exerciseName }: Props) => {
  const { exercise } = useExercise();
  const [soundOn, setSoundOn] = useState(true);
  const { stop } = useWebcam();
  const navigate = useNavigate();

  const repSound = useAudio(repSoundSrc);

  const wrapper = useRef<HTMLDivElement | null>(null);
  const { videoHeight } = useBreakpoint();

  const onRepsChange = useCallback(() => {
    if (soundOn) {
      repSound.pause();
      repSound.currentTime = 0;
      repSound.play();
    }

    wrapper.current?.animate(
      { background: ["#172554", "#84cc16", "#172554"] },
      { duration: 400, easing: "ease-in-out" }
    );
  }, [soundOn, repSound]);

  useEffect(() => {
    if (!exercise) return;

    exercise.addEventListener("repschange", onRepsChange);
    return () => exercise.removeEventListener("repschange", onRepsChange);
  }, [onRepsChange, exercise]);

  const onClose = useCallback(() => {
    stop();
    navigate({ from: `/exercise/$id`, to: "/home" });
  }, [navigate, stop]);

  return (
    <div
      className="absolute bottom-0 bg-slate-900 w-full min-h-[260px] z-20 rounded-t-[50%_30px] round-es pt-6"
      style={{ height: `calc(100vh - ${videoHeight}) + 30px` }}
      ref={wrapper}
    >
      <div className="text-center font-extrabold text-xl pb-6">
        {exerciseName}
      </div>
      <div className="flex justify-around px-6">
        <div className="w-12 flex flex-col justify-between">
          <ExerciseInfo exercise="SQUAT" />
          <Button
            icon={<SoundOff color={soundOn ? undefined : colors.slate[900]} />}
            variant={soundOn ? "square" : "square-active"}
            onClick={() => setSoundOn(!soundOn)}
          />
        </div>
        <div className="flex flex-col justify-between items-center">
          <div>
            <RepsCounter maxReps={maxReps} />
          </div>
          <div>
            <Button
              variant="red-small"
              size="md"
              onClick={onClose}
              icon={<Cross color="white" size="sm" />}
            >
              <span className="ml-3">STOP</span>
            </Button>
          </div>
        </div>
        <div className="w-12 flex justify-end">
          <ExerciseProgress />
        </div>
      </div>
    </div>
  );
};

export default ExercisePanel;
