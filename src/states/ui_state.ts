import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

export const ui = atom<{
  drawer: "calculation" | "navigation" | null;
  visited: boolean;
}>({
  key: "ui-state",
  default: {
    drawer: null,
    visited: false,
  },
});

export const useRestoreVisitInfo = () => {
  const [uistate, setuistate] = useRecoilState(ui);
  useEffect(() => {
    const visited = localStorage.getItem("visited");
    setuistate({ ...uistate, visited: Boolean(visited) });
  }, []);
};
