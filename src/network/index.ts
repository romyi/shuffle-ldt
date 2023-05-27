import axios from "axios";

const HOST = "https://api.xn--d1abbla2bcfdv6l.xn--80adxhks";
export const instance = axios.create({
  baseURL: HOST,
  withCredentials: true,
  //   transformResponse: (data) => data.response,
});

export * from "./keystore";
export * from "./mutations";
