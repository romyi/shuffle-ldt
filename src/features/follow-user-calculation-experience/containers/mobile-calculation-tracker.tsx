import {
  Drawer,
  Container,
  Group,
  Badge,
  Text,
  Stack,
  SimpleGrid,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { calculation_state } from "@states/calculation";
import { ui } from "@states/ui";
import { useRecoilState, useRecoilValue } from "recoil";
import { IndicatorCard } from "@features/follow-user-calculation-experience/components";
import { useClasses } from "./mobile-calculation-tracker.classes";
import { Calculation } from "@tyles/calculation";
import { useState } from "react";
import { IconFlag2Filled } from "@tabler/icons-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { keys } from "@network/index";

const finish_access_checks = [
  "branch",
  "district",
  "equipment",
  "personnel",
  "facilitySquare",
  "landSquare",
] satisfies Array<Partial<keyof Calculation>>;

export const CalculationTracker = () => {
  const [uistate, setuistate] = useRecoilState(ui);
  const client = useQueryClient();
  const navigate = useNavigate();
  const onDrawerClose = () => setuistate({ ...uistate, drawer: null });
  const calculation = useRecoilValue(calculation_state);
  const [oncheck, setoncheck] = useState(false);
  const { classes } = useClasses();
  const [start, setstart] = useState(false);
  const { isFetching } = useQuery({
    ...keys.reports.create({
      ...calculation.snapshot,
      branch: Number(calculation.snapshot.branch),
    }),
    enabled: start,
    onSuccess: (data) => {
      localStorage.setItem(
        "report",
        JSON.stringify({ from: data.from, to: data.to })
      );
      client
        .invalidateQueries({ queryKey: keys.reports.list().queryKey })
        .then(() => navigate("/"));
    },
  });

  return (
    <Drawer
      zIndex={oncheck ? 120 : 110}
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
      <Container m="auto" mt="md" size={"xs"} p="0px" pr="xs" pl="xs" h="120px">
        <Group noWrap mt="md" position="left">
          <IndicatorCard
            url="/calculation/legal"
            showOn={finish_access_checks}
            contentOn={finish_access_checks}
          >
            <LoadingOverlay zIndex={300} visible={isFetching} />
            <Stack>
              {oncheck && (
                <Button
                  onClick={() => setoncheck(false)}
                  variant={"outline"}
                  radius={"md"}
                  size={"md"}
                  color="dark"
                >
                  Поправить
                </Button>
              )}
              <Button
                onClick={
                  oncheck
                    ? () => {
                        setstart(true);
                      }
                    : () => setoncheck(true)
                }
                radius={"md"}
                size={"md"}
              >
                {oncheck ? "Отправить" : "Проверить"}
              </Button>
              {!oncheck && (
                <Text size="xs">
                  Взгляните на информацию и отправьте её, если все верно
                </Text>
              )}
            </Stack>
          </IndicatorCard>
          <IndicatorCard
            url="/calculation/legal"
            showOn={["facilitySquare", "landSquare"]}
            contentOn={[
              "equipment",
              "branch",
              "personnel",
              "branch_display_alias",
            ]}
            follower="Заполните данные о предприятии"
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
                  Техники
                </Text>{" "}
                <Text>{calculation.snapshot.equipment} ед</Text>
              </Stack>
              <Text sx={{ wordBreak: "break-all" }} lineClamp={3} size="xs">
                {calculation.snapshot.branch_display_alias}
              </Text>
              {calculation.snapshot.isIndividual && (
                <Badge radius={"sm"} color="cyan">
                  ИП
                </Badge>
              )}
            </SimpleGrid>
          </IndicatorCard>
          <IndicatorCard
            url="/calculation/stat"
            showOn={["district"]}
            contentOn={["facilitySquare", "landSquare"]}
            follower="Заполните данные о площадях"
          >
            <SimpleGrid cols={2}>
              <Stack spacing={"0px"}>
                <Text size="sm" color="dimmed">
                  Земля
                </Text>{" "}
                <Text>{calculation.snapshot.landSquare} м²</Text>
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
                <Text>{calculation.snapshot.facilitySquare} м²</Text>
                {calculation.snapshot.isFacilityRental && (
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
          >
            <SimpleGrid cols={1}>
              <Stack spacing={"0px"}>
                <Text color="dimmed" size="sm">
                  Выбранный округ
                </Text>
                <Text mb="12px">
                  {calculation.snapshot.district_display_alias}
                </Text>
              </Stack>
              <IconFlag2Filled />
            </SimpleGrid>
          </IndicatorCard>
        </Group>
      </Container>
    </Drawer>
  );
};
