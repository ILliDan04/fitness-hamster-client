import { createFileRoute } from "@tanstack/react-router";
import SquatExercise from "@/components/exercise/SquatExercise";
import { useCallback } from "react";
import useExerciseComplete from "@/api/exercise/useExerciseComplete";

export const Route = createFileRoute("/exercise/$id/")({
  component: () => <Exercise />,
});

function Exercise() {
  const { id } = Route.useParams();
  const { mutateAsync: complete } = useExerciseComplete();

  const onExerciseComplete = useCallback(async () => {
    try {
      await complete(id);
    } catch (error) {}
  }, [complete, id]);

  return <SquatExercise onDone={onExerciseComplete} />;
}
