import axios from "axios";

const HOST = "https://api.xn--d1abbla2bcfdv6l.xn--80adxhks";
export const instance = axios.create({
  baseURL: HOST,
});

instance.interceptors.request.use((config) => {
  if (localStorage.getItem("auth")) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("auth")}`;
    return config;
  }
  return config;
});

export * from "./keystore";
export * from "./mutations";
