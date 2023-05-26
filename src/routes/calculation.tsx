import { useEffect } from "react";
import { Container, Group, Header, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRecoilState, useRecoilValue } from "recoil";
import { ui } from "@states/ui_state";
import { calculation_state } from "@states/calculation";
import { Outlet } from "react-router-dom";
import { useRestoreStep } from "@features/follow-user-calculation-experience/hooks/useRestoreStep";

export const Calculation = () => {
  const wideScreen = useMediaQuery("(min-width: 1080px)");
  const [uistate, setuistate] = useRecoilState(ui);
  const calculation = useRecoilValue(calculation_state);
  useEffect(() => {
    if (uistate.drawer !== "navigation")
      setuistate({ ...uistate, drawer: "calculation" });
  }, [uistate.drawer]);
  useRestoreStep();
  return (
    <>
      {wideScreen && (
        <Header fixed height={80} withBorder={false}>
          <Container p="xl">
            {calculation?.snapshot.district_display_alias && (
              <Group>
                <Text>Округ:</Text>
                <Text color="dimmed">
                  {" "}
                  {calculation?.snapshot.district_display_alias}
                </Text>
              </Group>
            )}
          </Container>
        </Header>
      )}
      <Container p="xl" pt="xs">
        <Outlet />
      </Container>
    </>
  );
};
