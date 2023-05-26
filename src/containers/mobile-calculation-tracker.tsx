import { ProgressBar } from "@components/mobile-progress-bar";
import { useOngoingCalculation } from "@features/persist-user-calculation";
import { Drawer, createStyles, Container } from "@mantine/core";
import { ui } from "@states/ui_state";
import { useRecoilState } from "recoil";

const useStyles = createStyles(() => ({
  overlay: {
    transitionDuration: "0.5s !important",
  },
  inner: {
    padding: "0px",
  },
  content: {
    height: "200px",
    borderRadius: "24px 24px 0px 0px",
    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
    transitionDuration: "0.5s !important",
  },
  body: {
    padding: "0px",
  },
}));

export const MobileCalculationTracker = () => {
  const [uistate, setuistate] = useRecoilState(ui);
  const onDrawerClose = () => setuistate({ ...uistate, drawer: null });
  const { classes } = useStyles();
  const { calculation } = useOngoingCalculation();
  return (
    <Drawer
      zIndex={80}
      classNames={{
        inner: classes.inner,
        content: classes.content,
        body: classes.body,
        overlay: classes.overlay,
      }}
      withOverlay={false}
      withCloseButton={false}
      position="bottom"
      lockScroll={false}
      opened={uistate.drawer === "calculation"}
      onClose={onDrawerClose}
    >
      <Container mt="md" size={"xs"} p="md" h="200px">
        <ProgressBar />
        {calculation?.district_display_alias}
      </Container>
    </Drawer>
  );
};
