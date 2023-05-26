import { Container, createStyles, Footer, Group, Text } from "@mantine/core";
import { useRecoilState } from "recoil";
import { ui } from "@states/ui_state";
import { IconListDetails, IconTablePlus } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const useFooterStyles = createStyles({
  root: {
    zIndex: 100,
  },
});

export const MobileFooter = () => {
  const [uistate, setuistate] = useRecoilState(ui);
  const { classes } = useFooterStyles();
  const navigate = useNavigate();
  return (
    <Footer
      classNames={{ root: classes.root }}
      withBorder={false}
      height={70}
      pt="md"
    >
      <Container pr="xl" pl="xl">
        <Group noWrap spacing="63px" position="apart" align="flex-end">
          <Text color="#DCE0E7" size="xs">
            Гость
          </Text>
          <Group spacing={"xl"} pr={"xl"}>
            <IconTablePlus
              onClick={() => navigate("/calculation")}
              strokeWidth={1.5}
              size={36}
              color={uistate.drawer === "calculation" ? "#D6336C" : "black"}
            />

            {/* <motion.div animate={{ y: uistate.navigation_drawer ? -240 : 0 }}> */}
            <IconListDetails
              onClick={() =>
                setuistate({
                  ...uistate,
                  drawer: "navigation",
                })
              }
              strokeWidth={1.5}
              size={36}
              color={uistate.drawer === "navigation" ? "#D6336C" : "black"}
            />
            {/* </motion.div> */}
          </Group>
        </Group>
      </Container>
    </Footer>
  );
};
