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
      squareLand: null,
      squareFacilities: null,
      isEnterpreneur: null,
      equipmentUnits: null,
      isLandRental: null,
      isFacilitiesRental: null,
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
