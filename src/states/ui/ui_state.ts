import { atom } from "recoil";

export const ui = atom<{
  drawer: "calculation" | "navigation" | null;
}>({
  key: "ui-state",
  default: {
    drawer: null,
  },
});

export const useUserRegistered = () => {
  const status = localStorage.getItem("registered");
  return {
    isRegistered: Boolean(status),
    recordRegistration: () => localStorage.setItem("registered", "true"),
  };
};
