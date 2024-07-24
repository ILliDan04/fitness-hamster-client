import useExercise from "@/hooks/useExercise";
import { interpolateColor, RGB } from "@/utils/colors";
import { useCallback, useEffect, useMemo, useState } from "react";

const RED_COLOR: RGB = [244, 63, 94];
const GREEN_COLOR: RGB = [132, 204, 22];

const ExerciseProgress = () => {
  const { exercise } = useExercise();

  const [progress, setProgress] = useState(0);

  const bg = useMemo(() => {
    const color = interpolateColor(RED_COLOR, GREEN_COLOR, progress);
    return `rgb(${color[0]},${color[1]},${color[2]})`;
  }, [progress]);

  const cb = useCallback((e: CustomEvent<number>) => {
    setProgress(e.detail);
  }, []);

  useEffect(() => {
    if (!exercise) return;

    exercise.addEventListener("progresschange", cb);
    return () => exercise.removeEventListener("progresschange", cb);
  }, [cb, exercise]);

  return (
    <div className="flex flex-col justify-between w-9">
      <p className="text-center text-sm tabular-nums">{progress}%</p>
      <div className="h-[120px] bg-white bg-opacity-10 rounded-lg flex flex-col-reverse overflow-hidden">
        <div
          className="h-10"
          style={{ backgroundColor: bg, height: (progress * 120) / 100 }}
        />
      </div>
    </div>
  );
};

export default ExerciseProgress;
