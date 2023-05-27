import { Calculation } from "@tyles/calculation";
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
