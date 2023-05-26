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
import { motion } from "framer-motion";

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
        <Group noWrap mt="md" align={"flex-start"} position="right">
          <motion.div animate={{ y: region ? 10 : 0 }}>
            <Card
              shadow={"sm"}
              radius="md"
              p="sm"
              onClick={() => navigate("/calculation")}
            >
              <Text size={"xs"}>Регион</Text>
              <Group mt="sm">
                <Badge>{calculation.snapshot.district_display_alias}</Badge>
              </Group>
            </Card>
          </motion.div>
          <motion.div animate={{ y: facilities ? 10 : 0 }}>
            <Card
              shadow={"sm"}
              radius="md"
              p="sm"
              onClick={() => navigate("/calculation/facilities")}
            >
              {!calculation.snapshot.branch &&
              !calculation.snapshot.area_km &&
              !calculation.snapshot.personnel_count ? (
                <Text>+</Text>
              ) : (
                <>
                  <Text size={"xs"}>Предприятие</Text>
                  <Group mt="sm">
                    <Badge>Легкая промышленность</Badge>
                    <Badge>20 человек</Badge>
                    <Badge>30 тыс км</Badge>
                  </Group>
                </>
              )}
            </Card>
          </motion.div>
        </Group>
      </Container>
    </Drawer>
  );
};
