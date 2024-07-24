import { useQuery } from "@tanstack/react-query";
import api from "..";

const useSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      try {
        const { data } = await api.get<string>("/auth/session");
        return data;
      } catch (error) {
        return null;
      }
    },
  });
};

export default useSession;
