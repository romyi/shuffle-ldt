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

requestCalculation["key"] = "calculation-request";

export const sendOtp = (email: string): Promise<void> =>
  instance({ url: "/auth/otp-code", method: "GET", params: { email } });

sendOtp["key"] = "send-otp";

export const askForToken = ({ email, code }: { email: string; code: string }) =>
  instance({ url: "/auth/token", method: "GET", params: { email, code } });

askForToken["key"] = "ask-code";

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
updateUser["key"] = "update-user";
