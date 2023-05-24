import { useState } from "react";
import { Container, createStyles, Stack, Tabs, Text } from "@mantine/core";
import { MoscowMap } from "@components/deckgl-moscow-map";

const tabs = createStyles({
  tabsList: {
    flexWrap: "nowrap",
  },
});

export const Calculation = () => {
  const [region, setRegion] = useState<string>("");
  const [displayDistrict, setDisplayDistrict] = useState<string>("");
  const { classes } = tabs();
  return (
    <>
      <MoscowMap
        regionTitle={region}
        onClickCallback={(info) => {
          setDisplayDistrict(info.object.properties.NAME_AO);
          setRegion(info.object.properties.ABBREV_AO);
        }}
      />
      <Container size={"xs"} h="calc(100% - 80px)" pr="xl" pl="xl">
        <Stack align={"flex-end"} h="100%" justify={"space-between"}>
          <Tabs classNames={{ tabsList: classes.tabsList }} defaultValue={"ao"}>
            <Tabs.List>
              <Tabs.Tab value="ao">Расположение</Tabs.Tab>
              <Tabs.Tab value="sq">Площадка</Tabs.Tab>
              <Tabs.Tab value="people">Предприятие</Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <Stack align={"flex-end"}>
            <Text size={"lg"} fw={800}>
              {displayDistrict}
            </Text>
            {/* <Button disabled={!region} maw={80} onClick={() => navigate("/")}>
              Далее
            </Button> */}
          </Stack>
        </Stack>
      </Container>
    </>
  );
};
