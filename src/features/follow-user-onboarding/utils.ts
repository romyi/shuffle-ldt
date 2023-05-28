import { calculation_state } from "@states/calculation";
import { Calculation } from "@tyles/calculation";
import { useRecoilValue } from "recoil";

export const useStoragedCalc = ():
  | ({ from: string; to: string } & Calculation)
  | null => {
  const calc = localStorage.getItem("report");
  const data = localStorage.getItem("snapshot");
  const calculation = useRecoilValue(calculation_state);
  if (calc && data) {
    const ser_calc: { from: string; to: string } = JSON.parse(calc);
    const ser_data: Calculation = JSON.parse(data);
    return {
      from: ser_calc.from,
      to: ser_calc.to,
      ...ser_data,
      ...calculation.snapshot,
    };
  }
  return null;
};
