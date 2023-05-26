import { useEffect } from "react";
import { Container, Group, Header, Text } from "@mantine/core";
import { MoscowMap } from "@components/deckgl-moscow-map";
import { useMediaQuery } from "@mantine/hooks";
import { useRecoilState } from "recoil";
import { ui } from "@states/ui_state";
import { useOngoingCalculation } from "@features/persist-user-calculation";

export const Calculation = () => {
  const { calculation } = useOngoingCalculation();
  const wideScreen = useMediaQuery("(min-width: 1080px)");
  const [uistate, setuistate] = useRecoilState(ui);
  useEffect(() => {
    setuistate({ ...uistate, drawer: "calculation" });
  }, [uistate.navigation_drawer]);

  return (
    <>
      {wideScreen && (
        <Header fixed height={80} withBorder={false}>
          <Container p="xl">
            {calculation?.district_display_alias && (
              <Group>
                <Text>Округ:</Text>
                <Text color="dimmed">
                  {" "}
                  {calculation?.district_display_alias}
                </Text>
              </Group>
            )}
          </Container>
        </Header>
      )}
      <Container p="xl" pt="xs">
        <MoscowMap />
      </Container>
    </>
  );
};
