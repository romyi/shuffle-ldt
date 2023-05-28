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
        personnel: null,
        landSquare: null,
        facilitySquare: null,
        isIndividual: false,
        equipment: null,
        isFacilityRental: false,
        isLandRental: false,
        branch_display_alias: null,
      },
    });
};
