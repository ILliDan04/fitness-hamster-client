import Play from "../icons/Play";
import { cn } from "@/shadcn-lib/utils";
import Restart from "../icons/Restart";
import { Button } from "@/shadcn-components/ui/button";
import { ExerciseResponse } from "@/api/exercise/useExercises";
import { EXERCISE_LABEL } from "@/utils/exercises";
import { useCallback, useMemo } from "react";
import Tick from "../icons/Tick";
import Cross from "../icons/Cross";
import TaskTimer from "./TaskTimer";
import dayjs from "dayjs";
import colors from "tailwindcss/colors";
import { useNavigate } from "@tanstack/react-router";
import { Skeleton } from "@/shadcn-components/ui/skeleton";

type Props = {
  exercise?: ExerciseResponse[number];
};

const Task = ({ exercise }: Props) => {
  const navigate = useNavigate();

  const loading = useMemo(() => !exercise, [exercise]);

  const [done, expired, toBeDone] = useMemo(() => {
    const isDone = exercise?.done;
    if (isDone) return [true, false, false];

    const isExpired = dayjs().isAfter(exercise?.date_end);
    if (isExpired) return [false, true, false];

    return [false, false, true];
  }, [exercise?.done, exercise?.date_end]);

  const doExercise = useCallback(
    () => navigate({ to: `/exercise/${exercise?.id ?? ""}` }),
    [navigate, exercise?.id]
  );

  return (
    <div
      className={cn(
        "bg-white/10 border-2 border-transparent py-2 px-5 rounded-2xl flex items-center",
        toBeDone ? "" : "bg-transparent  border-white/10"
      )}
    >
      <div>
        {loading && <Skeleton className="w-6 h-6 bg-white/10" />}
        {!loading && (
          <div
            className={cn(
              "w-6 h-6 rounded-full border-2 border-lime-500 flex justify-center items-center",
              done ? "bg-lime-500" : expired ? "border-rose-500" : ""
            )}
          >
            {done && <Tick color={colors.slate[900]} />}
            {expired && <Cross color={colors.rose[500]} size="sm" />}
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 mx-4">
        {loading && <Skeleton className="h-6 w-1/3 mb-1 bg-white/10" />}
        {!loading && (
          <h5 className="font-extrabold text-xl">
            {EXERCISE_LABEL[exercise!.type]}
          </h5>
        )}

        <TaskTimer exercise={exercise} isDone={done} isExpired={expired} />
      </div>
      {loading && <Skeleton className="w-6 h-6 bg-white/10" />}
      {!loading && (
        <div>
          {done && <Button icon={<Restart />} onClick={doExercise} />}
          {toBeDone && <Button icon={<Play />} onClick={doExercise} />}
          {expired && <Button icon={<Restart />} disabled />}
        </div>
      )}
    </div>
  );
};

export default Task;
