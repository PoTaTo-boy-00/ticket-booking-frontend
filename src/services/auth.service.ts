import { refreshApi } from "@/libs/refreshApi";
import { api } from "../libs/api";
import axios from "axios";

export const loginWithGoogle = async (idToken: string) => {
  
  return axios.post(
    "http://localhost:5000/api/auth/google",
    { idToken },
    {
      withCredentials: true,
    }
  );
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