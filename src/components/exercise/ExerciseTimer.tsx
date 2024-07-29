import useExercise from "@/hooks/useExercise";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

const ExerciseTimer = () => {
  const { exercise } = useExercise();
  const [duration, setDuration] = useState("00:00");

  const onTimeChange = useCallback((e: CustomEvent<number>) => {
    setDuration(dayjs.duration(e.detail, "milliseconds").format("mm:ss"));
  }, []);

  useEffect(() => {
    if (!exercise) return;

    exercise.addEventListener("timechange", onTimeChange);
    return () => exercise.removeEventListener("timechange", onTimeChange);
  }, [onTimeChange, exercise]);

  return (
    <div className="font-mono font-medium text-center tabular-nums">
      {duration}
    </div>
  );
};

export default ExerciseTimer;
