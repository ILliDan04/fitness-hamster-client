import { ExerciseResponse } from "@/api/exercise/useExercises";

export type Exercise = ExerciseResponse[number]["type"];
export const EXERCISE_LABEL: Record<Exercise, string> = {
  BURPY: "Burpies",
  LUNGE: "Lunges",
  MOUNTAIN_CLIMBER: "Mountain Climber",
  PUSHUP: "Push-ups",
  SQUAT: "Squats",
};
