import SquatExercise from "@/components/SquatExercise";
import { createFileRoute } from "@tanstack/react-router";

const Index = () => {
  return <SquatExercise />;
};

export const Route = createFileRoute("/")({ component: Index });
