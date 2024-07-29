import useExercise from "@/hooks/useExercise";
import { numberFormatter } from "@/utils/format";
import { useCallback, useEffect, useState } from "react";

type Props = {
  maxReps: number;
};

const RepsCounter = ({ maxReps }: Props) => {
  const { exercise } = useExercise();
  const [reps, setReps] = useState(0);

  const onRepChange = useCallback((e: CustomEvent<number>) => {
    setReps(e.detail);
  }, []);

  useEffect(() => {
    if (!exercise) return;

    exercise.addEventListener("repschange", onRepChange);
    return () => exercise.removeEventListener("repschange", onRepChange);
  }, [onRepChange, exercise]);

  return (
    <div className="flex flex-col font-mono font-black tabular-nums">
      {maxReps && (
        <div className="text-4xl">
          {numberFormatter.format(reps)}/{numberFormatter.format(maxReps)}
        </div>
      )}
    </div>
  );
};

export default RepsCounter;
