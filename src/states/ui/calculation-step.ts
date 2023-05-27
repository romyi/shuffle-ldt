import { calculation_state } from "@states/calculation";
import { selector } from "recoil";

export const calculation_step = selector({
  key: "ui-calculation-step",
  get: ({ get }) => {
    const { snapshot } = get(calculation_state);
    if (!snapshot.district) {
      return "/calculation";
    } else if (
      !snapshot.personnel ||
      !snapshot.landSquare ||
      !snapshot.facilitySquare ||
      !snapshot.equipment
    ) {
      return "/calculation/stat";
    } else {
      return "/calculation/legal";
    }
  },
});
