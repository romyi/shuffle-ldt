import { Drawer, createStyles } from "@mantine/core";
import { nav_drawer_state } from "@states/ui/navigation";
import { useRecoilState } from "recoil";
import { CoreCarousel } from "../app-carousel";

const useStyles = createStyles(() => ({
  inner: {
    padding: "0px",
  },
  content: {
    borderRadius: "12px 12px 0px 0px",
    height: "170px",
  },
  body: {
    padding: "0px",
  },
}));

export const MobileNavigation = () => {
  const [nDrawer, setNDrawer] = useRecoilState(nav_drawer_state);
  const onDrawerClose = () => setNDrawer({ isOpen: false });
  const { classes } = useStyles();
  return (
    <Drawer
      overlayProps={{ opacity: 0.05 }}
      classNames={{
        inner: classes.inner,
        content: classes.content,
        body: classes.body,
      }}
      closeOnClickOutside
      withCloseButton={false}
      position="bottom"
      size={"xs"}
      opened={nDrawer.isOpen}
      onClose={onDrawerClose}
    >
      <CoreCarousel />
    </Drawer>
  );
};
