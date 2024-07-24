import { ExerciseResponse } from "@/api/exercise/useExercises";
import { Skeleton } from "@/shadcn-components/ui/skeleton";
import dayjs from "dayjs";
import { Duration } from "dayjs/plugin/duration";
import { useEffect, useMemo, useState } from "react";

type Props = {
  exercise?: ExerciseResponse[number];
  isDone: boolean;
  isExpired: boolean;
};

const TaskTimer = ({ exercise, isDone, isExpired }: Props) => {
  const [duration, setDuration] = useState<Duration | null>(null);
  const timer = useMemo(() => {
    if (!exercise) return null;
    const { date_done } = exercise;

    if (isDone) {
      return <span className="opacity-80">{dayjs(date_done).fromNow()}</span>;
    }
    if (isExpired) {
      return <span className="opacity-80">Expired</span>;
    }
    if (!duration) {
      return null;
    }

    const days = duration.format("D");
    const time = duration.format("HH:mm:ss");
    return (
      <>
        <span className="opacity-80 mr-4">Expires in</span>
        {days !== "0" && (
          <>
            <span className="opacity-80">{days}d</span>
            <span className="mx-2 opacity-40">|</span>
          </>
        )}
        <span className="opacity-80">{time}</span>
      </>
    );
  }, [exercise, duration, isDone, isExpired]);

  useEffect(() => {
    if (isDone || isExpired || !exercise) return;
    const interval = setInterval(
      () => setDuration(dayjs.duration(dayjs(exercise.date_end).diff(dayjs()))),
      1000
    );
    return () => clearInterval(interval);
  }, [exercise, isDone, isExpired]);

  return timer ? (
    <p className="tabular-nums font-mono">{timer}</p>
  ) : (
    <Skeleton className="h-5 mb-1 bg-white/10 w-2/3" />
  );
};

export default TaskTimer;
