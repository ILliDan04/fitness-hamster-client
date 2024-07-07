import { authContext } from "@/context/AuthContext";
import { useContext } from "react";

export const useAuth = () => {
  return useContext(authContext);
};
