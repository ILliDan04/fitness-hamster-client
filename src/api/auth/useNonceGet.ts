import { useQuery } from "@tanstack/react-query";
import api from "..";

const useNonceGet = () => {
  return useQuery({
    queryKey: ["nonce"],
    queryFn: async () => {
      const { data } = await api.get<string>("/auth/nonce");
      return data;
    },
  });
};

export default useNonceGet;
