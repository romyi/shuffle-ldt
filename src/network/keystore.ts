import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { Calculation } from "@tyles/calculation";
import { User } from "@tyles/user";
import { m } from "framer-motion";
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
            localStorage.setItem("registered", "true");
          })
          .catch(),
    }),
    refresh: () => ({
      queryKey: ["refresh"],
      queryFn: () => instance({ url: "/auth/token/refresh" }).then().catch(),
    }),
    askEmailCode: (email: string) => ({
      queryKey: ["send-code"],
      queryFn: () =>
        instance({ url: "/auth/otp-code", params: { email: email } })
          .then()
          .catch(() => Promise.reject(new Error())),
    }),
  },
  user: {
    me: () => ({
      queryKey: ["me"],
      queryFn: (): Promise<{ email: string }> => {
        return instance({
          url: "/users/me",
        })
          .then((response) => {
            return response.data;
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
    list: () => ({
      queryKey: ["list"],
      queryFn: (): Promise<
        {
          from: string;
          to: string;
          id: string;
          request: Calculation;
        }[]
      > =>
        instance({
          url: "/reports",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.data)
          .catch(() => Promise.reject(new Error())),
    }),
    pdf: ({ id }: { id: string }) => ({
      queryKey: ["pdf-summary"],
      queryFn: (): any =>
        instance({
          url: `/reports/${id}/file`,
          responseType: "blob",
        })
          .then((response) => ({
            link: URL.createObjectURL(response.data),
            revoke: () => URL.revokeObjectURL(response.data),
          }))
          .catch(() => Promise.reject(new Error())),
    }),
  },
});
