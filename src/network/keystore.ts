import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { ErrorResponse } from "@remix-run/router";
import { instance } from ".";

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
      queryFn: () => {
        return instance({ url: "/users/me" })
          .then((response) => {
            return response;
          })
          .catch(() => {
            return Promise.reject(new Error());
          });
      },
    }),
  },
  static: {
    industries: () => ({
      queryKey: ["industries"],
      queryFn: (): Promise<Array<{ id: number; name: string }>> =>
        instance({ url: "/static/industries" })
          .then((response) => response.data)
          .catch(),
    }),
  },
});
