import { useMutation } from "@tanstack/react-query";
import api from "..";

type RequestParams = {
  address: string;
  publicKey: string;
  proof: {
    timestamp: number;
    payload: string;
    signature: string;
    domain: {
      lengthBytes: number;
      value: string;
    };
  };
};

type SigninResponse = {
  account_id: string;
  address: string;
  referral_account_id: string | null;
  max_referrals: number;
};

const useSignin = () => {
  return useMutation({
    mutationFn: async (data: RequestParams) => {
      const res = await api.post<SigninResponse>("/auth/signin", data);
      return res.data;
    },
  });
};

export default useSignin;
