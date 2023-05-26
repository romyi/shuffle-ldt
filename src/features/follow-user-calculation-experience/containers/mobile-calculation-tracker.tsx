import {
  Drawer,
  Container,
  Group,
  Badge,
  Text,
  Stack,
  SimpleGrid,
  Button,
} from "@mantine/core";
import { calculation_state } from "@states/calculation";
import { ui } from "@states/ui_state";
import { useRecoilState, useRecoilValue } from "recoil";
import { IndicatorCard } from "@features/follow-user-calculation-experience/components";
import { useClasses } from "./mobile-calculation-tracker.classes";
import { Calculation } from "@tyles/calculation";
import { useState } from "react";

const finish_access_checks = [
  "branch",
  "district",
  "equipmentUnits",
  "personnel",
  "squareFacilities",
  "squareLand",
] satisfies Array<Partial<keyof Calculation>>;

export const CalculationTracker = () => {
  const [uistate, setuistate] = useRecoilState(ui);
  const onDrawerClose = () => setuistate({ ...uistate, drawer: null });
  const { classes } = useClasses();
  const calculation = useRecoilValue(calculation_state);
  const [oncheck, setoncheck] = useState(false);
  return (
    <Drawer
      zIndex={80}
      classNames={{
        inner: classes.inner,
        content: classes.content,
        body: classes.body,
        overlay: classes.overlay,
        root: classes.root,
      }}
      withOverlay={oncheck}
      withCloseButton={false}
      position="bottom"
      lockScroll={true}
      opened={uistate.drawer === "calculation"}
      onClose={onDrawerClose}
    >
      <Container mt="md" size={"xs"} p="0px" pr="xs" pl="xs" h="120px">
        <Group noWrap mt="md" position="left">
          <IndicatorCard
            url="/calculation/legal"
            showOn={finish_access_checks}
            contentOn={finish_access_checks}
            placeholder=""
          >
            <Stack>
              {oncheck && (
                <Button
                  onClick={() => setoncheck(false)}
                  variant={"outline"}
                  radius={"md"}
                  size={"md"}
                >
                  Поправить
                </Button>
              )}
              <Button
                onClick={() => setoncheck(true)}
                variant={"gradient"}
                radius={"md"}
                size={"md"}
              >
                {oncheck ? "Отправить" : "Проверить"}
              </Button>
            </Stack>
          </IndicatorCard>
          <IndicatorCard
            url="/calculation/legal"
            showOn={["squareFacilities", "squareLand"]}
            contentOn={["equipmentUnits", "branch"]}
            placeholder="Предприятие"
          >
            <SimpleGrid cols={2}>
              <Stack spacing={"0px"}>
                <Text size="sm" color="dimmed">
                  Человек
                </Text>{" "}
                <Text>{calculation.snapshot.personnel}</Text>
              </Stack>
              <Stack align={"flex-start"} spacing={"0px"}>
                <Text size="sm" color="dimmed">
                  Машин
                </Text>{" "}
                <Text>{calculation.snapshot.equipmentUnits}</Text>
              </Stack>
              <Text size="xs">{calculation.snapshot.branch}</Text>
              <Badge radius={"sm"} color="cyan">
                ИП
              </Badge>
            </SimpleGrid>
          </IndicatorCard>
          <IndicatorCard
            url="/calculation/stat"
            showOn={["district"]}
            contentOn={["squareFacilities", "squareLand"]}
            placeholder="Площадки"
          >
            <SimpleGrid cols={2}>
              <Stack spacing={"0px"}>
                <Text size="sm" color="dimmed">
                  Земля
                </Text>{" "}
                <Text>{calculation.snapshot.squareLand} м²</Text>
                {calculation.snapshot.isLandRental && (
                  <Badge radius={"sm"} mt="md" ml="-5px" color={"cyan"}>
                    Аренда
                  </Badge>
                )}
              </Stack>
              <Stack align={"flex-start"} spacing={"0px"}>
                <Text size="sm" color="dimmed">
                  Здания
                </Text>{" "}
                <Text>{calculation.snapshot.squareFacilities} м²</Text>
                {calculation.snapshot.isFacilitiesRental && (
                  <Badge radius={"sm"} mt="md" color={"cyan"}>
                    Аренда
                  </Badge>
                )}
              </Stack>
            </SimpleGrid>
          </IndicatorCard>
          <IndicatorCard
            url="/calculation"
            showOn={null}
            contentOn={["district"]}
            placeholder="Выберите округ"
          >
            <SimpleGrid>
              <Stack>
                <Text color="dimmed">Выбранный округ</Text>
                <Text mt="xl">
                  {calculation.snapshot.district_display_alias}
                </Text>
              </Stack>
            </SimpleGrid>
          </IndicatorCard>
        </Group>
      </Container>
    </Drawer>
  );
};
