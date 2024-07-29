import { useQuery } from "@tanstack/react-query";
import api from "..";

export type ExerciseResponse = {
  id: string;
  type: "SQUAT" | "PUSHUP" | "LUNGE" | "BURPY" | "MOUNTAIN_CLIMBER";
  done: boolean;
  date_start: Date;
  date_end: Date;
  date_done: Date | null;
  account_id: string;
};

const useExercise = (id?: string | null) => {
  return useQuery({
    enabled: !!id,
    queryKey: ["exercise", id],
    queryFn: async () => {
      const { data } = await api.get<ExerciseResponse>(`/exercise/${id}`);
      return data;
    },
  });
};

export default useExercise;
