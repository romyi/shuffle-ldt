import { useEffect } from "react";
import { Container } from "@mantine/core";
import { useRecoilState } from "recoil";
import { ui } from "@states/ui_state";
import { Outlet } from "react-router-dom";
import { useRestoreStep } from "@features/follow-user-calculation-experience/hooks/useRestoreStep";
import { CalculationTracker } from "@features/follow-user-calculation-experience";
import { useIsMutating } from "@tanstack/react-query";
import { LoadingOverlay } from "@mantine/core";
import { requestCalculation } from "@network/mutations";

export const Calculation = () => {
  const [uistate, setuistate] = useRecoilState(ui);
  useEffect(() => {
    if (uistate.drawer !== "navigation")
      setuistate({ ...uistate, drawer: "calculation" });
  }, [uistate.drawer]);
  const isRequesting = Boolean(useIsMutating([requestCalculation.key]));
  // restore url by snapshot state
  useRestoreStep();

  return (
    <>
      <Container>
        <LoadingOverlay
          zIndex={300}
          opacity={0.5}
          visible={Boolean(isRequesting)}
        />
        <Outlet />
      </Container>
      <CalculationTracker />
    </>
  );
};
