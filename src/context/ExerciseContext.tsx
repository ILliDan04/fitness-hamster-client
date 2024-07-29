import ExerciseStatus from "@/utils/ExerciseStatus";
import PoseDetectionStatus from "@/utils/PoseDetectionStatus";
import { createContext } from "react";

type ExerciseContextType = {
  detection: PoseDetectionStatus | null;
  exercise: ExerciseStatus | null;
};

export const exerciseContext = createContext<ExerciseContextType>({
  detection: null,
  exercise: null,
});
const ExerciseContext = exerciseContext.Provider;

export default ExerciseContext;
