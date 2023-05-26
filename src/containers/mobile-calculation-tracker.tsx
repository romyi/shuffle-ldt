import {
  Drawer,
  createStyles,
  Container,
  Text,
  Group,
  Badge,
  Card,
} from "@mantine/core";
import { calculation_state } from "@states/calculation";
import { ui } from "@states/ui_state";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { AnimatePresence, motion } from "framer-motion";

const useStyles = createStyles(() => ({
  overlay: {
    transitionDuration: "0.5s !important",
  },
  inner: {
    padding: "0px",
  },
  root: {
    background: "transparent",
  },
  content: {
    height: "220px",
    background: "transparent",
    transitionDuration: "0.5s !important",
  },
  body: {
    padding: "0px",
    width: "fit-content",
  },
}));

export const MobileCalculationTracker = () => {
  const [uistate, setuistate] = useRecoilState(ui);
  const onDrawerClose = () => setuistate({ ...uistate, drawer: null });
  const { classes } = useStyles();
  const calculation = useRecoilValue(calculation_state);
  const navigate = useNavigate();
  const region = useMatch("calculation");
  const facilities = useMatch("calculation/facilities");
  const third = useMatch("calculation/third");

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
          <AnimatePresence>
            {calculation.snapshot.branch && (
              <motion.div
                initial={{ y: 400 }}
                animate={{ y: third ? 10 : 0 }}
                exit={{ y: 400 }}
              >
                <Card
                  shadow={"sm"}
                  radius="md"
                  p="sm"
                  onClick={() => navigate("/calculation/third")}
                >
                  <Text size={"xs"}>Площадка</Text>
                  <Group mt="sm">
                    {!calculation.snapshot.personnel_count ? (
                      <Badge color={"dark"}>Добавить информацию</Badge>
                    ) : (
                      <>
                        <Badge>{calculation.snapshot.personnel_count}</Badge>
                      </>
                    )}
                  </Group>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {calculation.snapshot.district && (
              <motion.div
                initial={{ y: 400 }}
                animate={{ y: facilities ? 10 : 0 }}
                exit={{ y: 400 }}
              >
                <Card
                  shadow={"sm"}
                  radius="md"
                  p="sm"
                  onClick={() => navigate("/calculation/facilities")}
                >
                  <Text size={"xs"}>Предприятие</Text>
                  <Group mt="sm">
                    {!calculation.snapshot.branch &&
                    !calculation.snapshot.area_km &&
                    !calculation.snapshot.personnel_count ? (
                      <Badge color={"dark"}>Добавить информацию</Badge>
                    ) : (
                      <>
                        <Badge>{calculation.snapshot.branch}</Badge>
                      </>
                    )}
                  </Group>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div animate={{ y: region ? 10 : 0 }}>
            <Card
              shadow={"sm"}
              radius="md"
              p="sm"
              onClick={() => navigate("/calculation")}
            >
              <>
                <Text size={"xs"}>Округ</Text>
                <Group mt="sm">
                  {calculation.snapshot.district_display_alias ? (
                    <Badge>{calculation.snapshot.district_display_alias}</Badge>
                  ) : (
                    <Badge color={"dark"}>Выберите на карте</Badge>
                  )}
                </Group>{" "}
              </>
            </Card>
          </motion.div>
        </Group>
      </Container>
    </Drawer>
  );
};
