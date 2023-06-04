import { useEffect } from "react";
import { Container } from "@mantine/core";
import { useRecoilState } from "recoil";
import { ui } from "@states/ui";
import { Outlet } from "react-router-dom";
import { useRestoreStep } from "@features/follow-user-calculation-experience/hooks/useRestoreStep";
import { CalculationTracker } from "@features/follow-user-calculation-experience";

export const Calculation = () => {
  const [uistate, setuistate] = useRecoilState(ui);
  useEffect(() => {
    if (uistate.drawer !== "navigation")
      setuistate({ ...uistate, drawer: "calculation" });
  }, [uistate.drawer]);
  // restore url by snapshot state
  useRestoreStep();

  return (
    <>
      <Container pb={"180px"}>
        <Outlet />
      </Container>
      <CalculationTracker />
    </>
  );
};
