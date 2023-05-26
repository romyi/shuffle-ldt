import { Drawer, Container, Group, Badge } from "@mantine/core";
import { calculation_state } from "@states/calculation";
import { ui } from "@states/ui_state";
import { useRecoilState, useRecoilValue } from "recoil";
import { IndicatorCard } from "@features/follow-user-calculation-experience/components";
import { useClasses } from "./mobile-calculation-tracker.classes";

export const CalculationTracker = () => {
  const [uistate, setuistate] = useRecoilState(ui);
  const onDrawerClose = () => setuistate({ ...uistate, drawer: null });
  const { classes } = useClasses();
  const calculation = useRecoilValue(calculation_state);

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
      withOverlay={false}
      withCloseButton={false}
      position="bottom"
      lockScroll={false}
      opened={uistate.drawer === "calculation"}
      onClose={onDrawerClose}
    >
      <Container mt="md" size={"xs"} p="0px" pr="xs" pl="xs" h="120px">
        <Group noWrap mt="md" position="left" miw="100vw">
          <IndicatorCard
            url="/calculation/facilities"
            showOn={["district"]}
            contentOn={["branch"]}
            placeholder="Добавить сведения о площадке"
          >
            <Badge>{calculation.snapshot.branch}</Badge>
          </IndicatorCard>
          <IndicatorCard
            url="/calculation"
            showOn={null}
            contentOn={["district"]}
            placeholder="Выберите округ"
          >
            <Badge>{calculation.snapshot.district_display_alias}</Badge>
          </IndicatorCard>
        </Group>
      </Container>
    </Drawer>
  );
};
