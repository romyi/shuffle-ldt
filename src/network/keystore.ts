import axios from "axios";
import { createQueryKeyStore } from "@lukemorales/query-key-factory";

const HOST = "https://api.xn--d1abbla2bcfdv6l.xn--80adxhks";

const instance = axios.create({
  baseURL: HOST,
  transformResponse: (data) => data.response,
});

export const keys = createQueryKeyStore({
  auth: {
    token: () => ({
      queryKey: ["token"],
      queryFn: (ctx: { email: string; code: string }) =>
        instance({
          url: "/auth/token",
          params: { email: ctx.email, code: ctx.code },
        })
          .then((response) => response)
          .catch(),
    }),
    refresh: () => ({
      queryKey: ["refresh"],
      queryFn: () => instance({ url: "/auth/token/refresh" }).then().catch(),
    }),
    sendAuthCode: () => ({
      queryKey: ["send-code"],
      queryFn: (ctx: { email: string }) =>
        instance({ url: "/auth/token", params: { email: ctx.email } })
          .then()
          .catch(),
    }),
  },
  user: {
    me: () => ({
      queryKey: ["me"],
      queryFn: () => instance({ url: "/user/me" }).then().catch(),
    }),
  },
});
