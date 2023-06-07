import { SMALL_SCREEN_EXTENT } from "@const";
import { Drawer, createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ui } from "@states/ui";
import { useRecoilState } from "recoil";
import { DesktopContent } from "./desktop-content";
import { MobileContent } from "./mobile-content";

const useStyles = createStyles(() => ({
  overlay: {
    transitionDuration: "0.5s !important",
  },
  inner: {
    padding: "0px",
  },
  content: {
    borderRadius: "24px 24px 0px 0px",
    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
    transitionDuration: "0.5s !important",
  },
  body: {
    padding: "0px",
  },
}));

export const MobileNavigation = () => {
  const [uistate, setuistate] = useRecoilState(ui);
  const onDrawerClose = () => setuistate({ ...uistate, drawer: null });
  const smallScreen = useMediaQuery(SMALL_SCREEN_EXTENT);

  const { classes } = useStyles();
  return (
    <Drawer
      zIndex={80}
      overlayProps={{ opacity: 0 }}
      classNames={{
        inner: classes.inner,
        content: classes.content,
        body: classes.body,
        overlay: classes.overlay,
      }}
      closeOnClickOutside
      withCloseButton={false}
      position="bottom"
      size={"xs"}
      lockScroll={false}
      opened={uistate.drawer === "navigation"}
      onClose={onDrawerClose}
    >
      {smallScreen ? <MobileContent /> : <DesktopContent />}
    </Drawer>
  );
};
