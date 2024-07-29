import { useMutation } from "@tanstack/react-query";
import api from "..";
import { SessionResponse } from "./useSession";

type RequestParams = {
  ref?: string;
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

const useSignin = () => {
  return useMutation({
    mutationFn: async ({ ref, ...data }: RequestParams) => {
      const res = await api.post<SessionResponse>(`/auth/signin`, data, {
        params: { ref },
      });
      return res.data;
    },
  });
};

export default useSignin;
