import { useEffect } from "react";
import { Container, Group, Header, Text } from "@mantine/core";
import { MoscowMap } from "@components/deckgl-moscow-map";
import { useMediaQuery } from "@mantine/hooks";
import { useRecoilState, useRecoilValue } from "recoil";
import { ui } from "@states/ui_state";
import { calculation_state } from "@states/calculation";
import { Outlet, useNavigate } from "react-router-dom";

export const Calculation = () => {
  // const { calculation } = useOngoingCalculation();
  const wideScreen = useMediaQuery("(min-width: 1080px)");
  const [uistate, setuistate] = useRecoilState(ui);
  const calculation = useRecoilValue(calculation_state);
  const navigate = useNavigate();
  useEffect(() => {
    if (uistate.drawer !== "navigation")
      setuistate({ ...uistate, drawer: "calculation" });
  }, [uistate.drawer]);
  useEffect(() => {
    if (!calculation.snapshot.district_display_alias) {
      navigate("");
    } else if (!calculation.snapshot.branch) {
      navigate("/calculation/facilities");
    } else if (!calculation.snapshot.personnel_count) {
      navigate("/calculation/third");
    }
  }, []);
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
