import { useQuery } from "@tanstack/react-query";
import api from "..";

const useNonceGet = () => {
  return useQuery({
    queryKey: ["nonce"],
    queryFn: async () => {
      const { data, headers, config } = await api.get<string>("/auth/nonce");
      console.log(headers, config);

      return data;
    },
  });
};

export default useNonceGet;
