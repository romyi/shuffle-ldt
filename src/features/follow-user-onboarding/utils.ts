import { calculation_state } from "@states/calculation";
import { Calculation } from "@tyles/calculation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export const useStoragedCalc = ():
  | ({ from: string; to: string } & Calculation)
  | null => {
  const calc = localStorage.getItem("report");
  const calculation = useRecoilValue(calculation_state);
  const [storaged, setStoraged] = useState<
    null | ({ from: string; to: string } & Calculation)
  >(null);

  useEffect(() => {
    if (calc && calculation.snapshot) {
      const ser_calc: { from: string; to: string } = JSON.parse(calc);
      //   const ser_data: Calculation = JSON.parse(data);
      //   console.log(ser_calc, ser_data);
      setStoraged({
        from: ser_calc.from,
        to: ser_calc.to,
        // ...ser_data,
        ...calculation.snapshot,
      });
    }
  }, [calc, calculation.snapshot]);
  return storaged;
};
