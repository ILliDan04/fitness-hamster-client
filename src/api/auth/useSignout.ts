import { useMutation } from "@tanstack/react-query";
import api from "..";

const useSignout = () => {
  return useMutation({
    mutationFn: async () => {
      await api.post("/auth/signout");
    },
  });
};

export default useSignout;
