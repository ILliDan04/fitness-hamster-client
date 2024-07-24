import { createFileRoute } from "@tanstack/react-router";
import SquatExercise from "@/components/exercise/SquatExercise";

export const Route = createFileRoute("/exercise/$id/")({
  component: () => <Exercise />,
});

function Exercise() {
  return <SquatExercise />;
}
