import { calculation_state } from "@states/calculation";
import { Calculation } from "@tyles/calculation";
import { useRecoilValue } from "recoil";
import { useMemo } from "react";

export const useCalculationMatch = (
  attributes: Array<Partial<keyof Calculation>> | null
) => {
  const calculation = useRecoilValue(calculation_state);
  return useMemo(() => {
    let mount = false;
    if (attributes) {
      if (
        !attributes.find(
          (attribute) => calculation.snapshot[attribute] === null
        )
      )
        mount = true;
    } else {
      mount = true;
    }
    return mount;
  }, [attributes, calculation.snapshot]);
};
