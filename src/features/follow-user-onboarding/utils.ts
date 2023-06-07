import { calculation_state } from "@states/calculation";
import { Calculation } from "@tyles/calculation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export const useStoragedCalc = ():
  | ({ from: string; to: string; time: string } & Calculation)
  | null => {
  const calc = localStorage.getItem("report");
  const calculation = useRecoilValue(calculation_state);
  const [storaged, setStoraged] = useState<
    null | ({ from: string; to: string; time: string } & Calculation)
  >(null);

  useEffect(() => {
    if (calc && calculation.snapshot) {
      const ser_calc: { from: string; to: string; time: string } =
        JSON.parse(calc);
      setStoraged({
        from: ser_calc.from,
        to: ser_calc.to,
        time: ser_calc.time,
        ...calculation.snapshot,
      });
    }
  }, [calc, calculation.snapshot]);
  return storaged;
};
