import { useState, useEffect } from "react";
import { Container, Group, Header, Text } from "@mantine/core";
import { MoscowMap } from "@components/deckgl-moscow-map";
import { useMediaQuery } from "@mantine/hooks";
import { useRecoilState } from "recoil";
import { ui } from "@states/ui_state";

export const Calculation = () => {
  const [region, setRegion] = useState<string>("");
  const [displayDistrict, setDisplayDistrict] = useState<string>("");
  const wideScreen = useMediaQuery("(min-width: 1080px)");
  const [uistate, setuistate] = useRecoilState(ui);
  useEffect(() => {
    if (!uistate.navigation_drawer) {
      console.log("go");
      setuistate({ ...uistate, calculation_drawer: true });
    }
  }, [uistate.navigation_drawer]);

  return (
    <>
      {wideScreen && (
        <Header fixed height={80} withBorder={false}>
          <Container p="xl">
            {displayDistrict && (
              <Group>
                <Text>Округ:</Text>
                <Text color="dimmed"> {displayDistrict}</Text>
              </Group>
            )}
          </Container>
        </Header>
      )}
      <Container p="xl" pt="xs">
        <MoscowMap
          regionTitle={region}
          onClickCallback={(info) => {
            setDisplayDistrict(info.object.properties.NAME_AO);
            setRegion(info.object.properties.ABBREV_AO);
          }}
        />
      </Container>
    </>
  );
};
