import { ExerciseResponse } from "@/api/exercise/useExercises";
import squatsWebm from "@/assets/exercises/squats/video.webm";
import squatsHevc from "@/assets/exercises/squats/video.mp4";

export type Exercise = ExerciseResponse[number]["type"];
export const EXERCISE_LABEL: Record<Exercise, string> = {
  BURPY: "Burpies",
  LUNGE: "Lunges",
  MOUNTAIN_CLIMBER: "Mountain Climber",
  PUSHUP: "Push-ups",
  SQUAT: "Squats",
};
export const EXERCISE_DESC: Record<Exercise, string> = {
  SQUAT:
    "Stand with feet shoulder-width apart, lower by bending knees, keep back straight, chest up, thighs parallel to ground, push through heelsto stand.",
  BURPY: "",
  LUNGE: "",
  MOUNTAIN_CLIMBER: "",
  PUSHUP: "",
};
export const EXERCISE_VIDEO: Record<Exercise, [string, string]> = {
  BURPY: ["", ""],
  LUNGE: ["", ""],
  MOUNTAIN_CLIMBER: ["", ""],
  PUSHUP: ["", ""],
  SQUAT: [squatsHevc, squatsWebm],
};
