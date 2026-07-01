import { refreshApi } from "@/libs/refreshApi";
import { api } from "../libs/api";


export const loginWithGoogle = async (idToken: string) => {
  return api.post("/api/auth/google", { idToken });
  
};

export const getCurrentUser = async () => {
  // console.log("ME called")
  const res = await api.get("/api/auth/me");
  return res.data.data.user;
};

export const refreshSession = async () => {
  return refreshApi.post("/api/auth/refresh")
};

export const logout = async () => {
  return api.post("/api/auth/logout");
};