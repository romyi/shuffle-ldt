import { useState } from "react";
import { Container, Group, Header, Text } from "@mantine/core";
import { MoscowMap } from "@components/deckgl-moscow-map";
import { useMediaQuery } from "@mantine/hooks";

export const Calculation = () => {
  const [region, setRegion] = useState<string>("");
  const [displayDistrict, setDisplayDistrict] = useState<string>("");
  const isSummary = useMediaQuery("(min-width: 1080px)");
  return (
    <>
      <MoscowMap
        regionTitle={region}
        onClickCallback={(info) => {
          setDisplayDistrict(info.object.properties.NAME_AO);
          setRegion(info.object.properties.ABBREV_AO);
        }}
      />
      {isSummary && (
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
      <Container p="xl" h="1200px"></Container>
    </>
  );
};
