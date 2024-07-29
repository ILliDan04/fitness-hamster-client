import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "..";

const useExerciseComplete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.put(`/exercise/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
};

export default useExerciseComplete;
