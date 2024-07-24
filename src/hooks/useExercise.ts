import { exerciseContext } from "@/context/ExerciseContext";
import { useContext } from "react";

const useExercise = () => useContext(exerciseContext);
export default useExercise;
