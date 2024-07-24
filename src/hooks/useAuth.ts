import { authContext } from "@/context/NearAuthContext";
import { useContext } from "react";

export const useAuth = () => {
  return useContext(authContext);
};
