import { Calculation } from "@tyles/calculation";
import { User } from "@tyles/user";
import { instance } from ".";

export const requestCalculation = (
  calculation: Omit<Calculation, "district_display_alias">
): Promise<{ from: number; to: number }> =>
  instance({
    url: "/reports",
    method: "POST",
    data: calculation,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then()
    .catch((error) => error);

export const sendOtp = (email: string): Promise<void> =>
  instance({ url: "/auth/otp-code", method: "GET", params: { email } });

export const askForToken = ({ email, code }: { email: string; code: string }) =>
  instance({ url: "/auth/token", method: "GET", params: { email, code } });

export const updateUser = (info: Partial<User>) =>
  instance({
    url: "/users/me",
    method: "patch",
    data: info,
  })
    .then((response) => response.data)
    .catch(() => {
      return Promise.reject(new Error());
    });

export const archiveReport = (id: string) =>
  instance({ url: `/reports/${id}`, method: "delete" })
    .then((response) => response.data)
    .catch(() => Promise.reject(new Error()));

export const alarmReport = (payload: Calculation) =>
  instance({
    url: "/feedbacks/alarm",
    method: "post",
    data: { request: payload },
  })
    .then((response) => response.data)
    .catch(() => Promise.reject(new Error()));

export const provideModelFeedback = (feedback: {
  score: number;
  comment: string | undefined;
}) => {
  if (!feedback.comment) {
    delete feedback["comment"];
  }
  return instance({
    url: "/feedbacks/calculation",
    method: "post",
    data: feedback,
  })
    .then((response) => response.data)
    .catch(() => Promise.reject(new Error()));
};
// provideModelFeedback["key"] = "provide-reedback";

export const askQuestion = (question: { comment: string }) =>
  instance({ url: "/feedbacks/question", method: "post", data: question })
    .then((response) => response.data)
    .catch(() => Promise.reject(new Error()));

export const provideUxFeedback = (feedback: {
  score: number;
  comment: string | undefined;
}) => {
  if (!feedback.comment) {
    delete feedback["comment"];
  }
  return instance({
    url: "/feedbacks/common",
    method: "post",
    data: feedback,
  })
    .then((response) => response.data)
    .catch(() => Promise.reject(new Error()));
};

export const deleteFeedback = (id: string) => {
  return instance({
    url: `/feedbacks/${id}`,
    method: "delete",
  })
    .then((response) => response.data)
    .catch(() => Promise.reject(new Error()));
};
