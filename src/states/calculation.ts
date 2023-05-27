import { Calculation } from "@tyles/calculation";
import { atom, useRecoilState } from "recoil";
import { useEffect } from "react";

const isStorageSnapshot = (): Partial<Calculation> => {
  const checked = localStorage.getItem("snapshot");
  return checked ? JSON.parse(checked) : {};
};
export const calculation_state = atom<{ snapshot: Calculation }>({
  key: "calculation-input-snapshot",
  default: {
    snapshot: {
      district: null,
      district_display_alias: null,
      branch: null,
      personnel: null,
      landSquare: null,
      facilitySquare: null,
      isIndividual: null,
      equipment: null,
      isLandRental: null,
      isFacilityRental: null,
      ...isStorageSnapshot(),
    },
  },
});

export const useRestoreSnapshot = () => {
  const [calculation, setcalculation] = useRecoilState(calculation_state);

  useEffect(() => {
    setcalculation({
      snapshot: { ...calculation.snapshot, ...isStorageSnapshot() },
    });
  }, []);
};
