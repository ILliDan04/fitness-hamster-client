import { useQuery } from "@tanstack/react-query";
import api from "..";

const useReferralsUsed = () => {
  return useQuery({
    queryKey: ["referrals"],
    queryFn: async () => {
      const { data } = await api.get<number>("/account/referrals-used");
      return data;
    },
  });
};

export default useReferralsUsed;
