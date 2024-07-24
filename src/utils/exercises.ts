import { ExerciseResponse } from "@/api/exercise/useExercises";

export const EXERCISE_LABEL: Record<ExerciseResponse[number]["type"], string> =
  {
    BURPY: "Burpies",
    LUNGE: "Lunges",
    MOUNTAIN_CLIMBER: "Mountain Climber",
    PUSHUP: "Push-ups",
    SQUAT: "Squats",
  };
