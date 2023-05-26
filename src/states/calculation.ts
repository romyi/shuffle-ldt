import { Calculation } from "@tyles/calculation";
import { atom } from "recoil";

const isStorageSnapshot = (): Partial<Calculation> => {
  const checked = localStorage.getItem("snapshot");
  return checked ? JSON.parse(checked) : {};
};
export const calculation_state = atom<{ snapshot: Calculation }>({
  key: "calculation-input-snapshot",
  default: {
    snapshot: {
      district: "",
      district_display_alias: "",
      personnel_count: null,
      area_km: null,
      branch: null,
      ...isStorageSnapshot(),
    },
  },
});
