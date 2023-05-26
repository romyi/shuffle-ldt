import { Calculation } from "@tyles/calculation";

export const emitSessionMessage = (message: Partial<Calculation>) => {
  const calculation = sessionStorage.getItem("calculation");
  let new_calculation: Partial<Calculation>;
  if (calculation) {
    new_calculation = { ...JSON.parse(calculation), ...message };
    sessionStorage.setItem("calculation", JSON.stringify(new_calculation));
  } else {
    new_calculation = { ...message };
    sessionStorage.setItem("calculation", JSON.stringify(message));
  }
  const event = new CustomEvent("sessionStorage", { detail: new_calculation });
  window.dispatchEvent(event);
};
