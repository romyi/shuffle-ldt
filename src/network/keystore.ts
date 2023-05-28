import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { Calculation } from "@tyles/calculation";
import { instance } from ".";

export const keys = createQueryKeyStore({
  auth: {
    token: ({ email, code }: { email: string; code: string }) => ({
      queryKey: ["token"],
      queryFn: () =>
        instance({
          url: "/auth/token",
          params: { email: email, code: code },
        })
          .then((response) => {
            localStorage.setItem("auth", response.data.access.token);
          })
          .catch(),
    }),
    refresh: () => ({
      queryKey: ["refresh"],
      queryFn: () => instance({ url: "/auth/token/refresh" }).then().catch(),
    }),
    sendAuthCode: (email: string) => ({
      queryKey: ["send-code"],
      queryFn: () =>
        instance({ url: "/auth/otp-code", params: { email: email } })
          .then()
          .catch(),
    }),
  },
  user: {
    me: () => ({
      queryKey: ["me"],
      queryFn: () => {
        return instance({
          url: "/users/me",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
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
  reports: {
    create: (calculation: Calculation) => ({
      queryKey: ["create"],
      queryFn: (): Promise<{ from: string; to: string }> =>
        instance({
          url: "/reports",
          method: "POST",
          data: calculation,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.data)
          .catch((error) => error),
    }),
  },
});
