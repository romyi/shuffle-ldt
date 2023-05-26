import { atom } from "recoil";

export const ui = atom<{
  navigation_drawer: boolean;
  calculation_drawer: boolean;
  drawer: "calculation" | "navigation" | null;
}>({
  key: "ui-state",
  default: {
    navigation_drawer: false,
    calculation_drawer: false,
    drawer: null,
  },
});
