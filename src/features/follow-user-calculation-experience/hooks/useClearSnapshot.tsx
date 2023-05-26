import { calculation_state } from "@states/calculation";
import { useRecoilState } from "recoil";

export const useClearSnapshot = () => {
  const [, setcalculation] = useRecoilState(calculation_state);
  return () =>
    setcalculation({
      snapshot: {
        district: null,
        district_display_alias: null,
        branch: null,
        personnel_count: null,
        area_km: null,
      },
    });
};
