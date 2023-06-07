import { Drawer, Container, Group, Text } from "@mantine/core";
import { ui } from "@states/ui";
import { useRecoilState } from "recoil";
import { IndicatorCard } from "@features/follow-user-calculation-experience/components";
import { useClasses } from "./mobile-calculation-tracker.classes";
import { Calculation } from "@tyles/calculation";
import { useState } from "react";
import {
  DistrictDisplatStatus,
  LaunchCalculation,
  LegalsDisplayStatus,
  SquaresDisplayStatus,
} from "./indicators-input-status";
import {
  PickRegionHint,
  ProceedSquareInput,
  ProceedStatsInput,
} from "@features/user-ux-hints";

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
  const onDrawerClose = () => setuistate({ ...uistate, drawer: null });
  const [oncheck, setoncheck] = useState(false);
  const { classes } = useClasses();

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
      lockScroll={false}
      opened={uistate.drawer === "calculation"}
      onClose={onDrawerClose}
    >
      <Container m="auto" mt="md" size={"xs"} p="0px" pr="xs" pl="xs" h="120px">
        <Group noWrap mt="md" position="left">
          <IndicatorCard
            url="/calculation/legal"
            showOn={finish_access_checks}
            contentOn={finish_access_checks}
            invite={<Text>Завершить</Text>}
          >
            <LaunchCalculation
              calculationIsOnCheck={oncheck}
              setCheck={setoncheck}
            />
          </IndicatorCard>
          <IndicatorCard
            url="/calculation/legal"
            showOn={["facilitySquare", "landSquare"]}
            contentOn={["equipment", "personnel", "branch"]}
            invite={<ProceedStatsInput />}
          >
            <LegalsDisplayStatus />
          </IndicatorCard>
          <IndicatorCard
            url="/calculation/stat"
            showOn={["district"]}
            contentOn={["facilitySquare", "landSquare"]}
            invite={<ProceedSquareInput />}
          >
            <SquaresDisplayStatus />
          </IndicatorCard>
          <IndicatorCard
            url="/calculation"
            contentOn={["district_display_alias"]}
            showOn={null}
            invite={<PickRegionHint />}
          >
            <DistrictDisplatStatus />
          </IndicatorCard>
        </Group>
      </Container>
    </Drawer>
  );
};
