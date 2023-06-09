import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { Calculation } from "@tyles/calculation";
import {
  FeedAlarm,
  FeedCalculation,
  FeedCommon,
  FeedQuestion,
} from "@tyles/feedbacks";
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
          .catch(() => Promise.reject(new Error())),
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
      queryFn: () =>
        instance({
          url: "/users/me",
        })
          .then((response) => {
            return response.data;
          })
          .catch(() => {
            return Promise.reject(new Error());
          }),
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
          date: string;
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
  feedback: {
    all: () => ({
      queryKey: ["feed"],
      queryFn: (): Promise<{
        common: FeedCommon[];
        alarm: FeedAlarm[];
        question: FeedQuestion[];
        calculation: FeedCalculation[];
      }> =>
        instance({
          url: "/feedbacks",
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.data)
          .catch(() => Promise.reject(new Error())),
    }),
  },
});
// feedbacks: {
//   common: () => ({
//     queryKey: ["common"],
//     queryFn: (): Promise<Array<FeedCommon>> =>
//       instance({
//         url: "/feedbacks/common",
//         method: "get",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//         .then((response) => response.data)
//         .catch(() => Promise.reject(new Error())),
//   }),
//   alarm: () => ({
//     queryKey: ["alarm"],
//     queryFn: (): Promise<Array<FeedAlarm>> =>
//       instance({
//         url: "/feedbacks/alarm",
//         method: "get",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//         .then((response) => response.data)
//         .catch(() => Promise.reject(new Error())),
//   }),
//   question: () => ({
//     queryKey: ["question"],
//     queryFn: (): Promise<Array<FeedQuestion>> =>
//       instance({
//         url: "/feedbacks/question",
//         method: "get",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//         .then((response) => response.data)
//         .catch(() => Promise.reject(new Error())),
//   }),
//   calculation: () => ({
//     queryKey: ["calculatiofeedback"],
//     queryFn: (): Promise<Array<FeedCalculation>> =>
//       instance({
//         url: "/feedbacks/calculation",
//         method: "get",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//         .then((response) => response.data)
//         .catch(() => Promise.reject(new Error())),
//   }),
// },
