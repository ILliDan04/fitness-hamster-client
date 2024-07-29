import { useQuery } from "@tanstack/react-query";
import api from "..";

export type SessionResponse = {
  id: string;
  address: string;
  whitelisted: boolean;
  referral_account_id: string | null;
  max_referrals: number;
};

const useSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data } = await api.get<SessionResponse>("/auth/session");
      return data;
    },
  });
};

export default useSession;
