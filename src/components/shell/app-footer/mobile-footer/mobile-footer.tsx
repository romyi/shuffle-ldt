import { Container, createStyles, Footer, Group, Text } from "@mantine/core";
import { useMemo } from "react";
import { useRecoilState } from "recoil";
import { nav_drawer_state } from "@states/ui/navigation";
import {
  IconCalculator,
  IconListDetails,
  IconMathSymbols,
  IconX,
} from "@tabler/icons-react";
import { m, motion } from "framer-motion";

const useFooterStyles = createStyles({
  root: {
    zIndex: 100,
  },
});

export const MobileFooter = () => {
  const [menu, setMenu] = useRecoilState(nav_drawer_state);
  const { classes } = useFooterStyles();
  return (
    <Footer
      classNames={{ root: classes.root }}
      withBorder={false}
      height={70}
      pt="md"
    >
      <Container pr="xl" pl="xl" size={"xs"}>
        <Group noWrap spacing="63px" position="apart" align="flex-end">
          <Text color="#DCE0E7" size="xs">
            Гость
          </Text>
          <Group spacing={"xl"} pr={"xl"}>
            <IconMathSymbols
              strokeWidth={1.5}
              size={36}
              color={menu.isOpen ? "#DCE0E7" : "black"}
            />
            <motion.div animate={{ y: menu.isOpen ? -240 : 0 }}>
              <IconListDetails
                onClick={() => setMenu({ isOpen: true })}
                strokeWidth={1.5}
                size={36}
                color={menu.isOpen ? "#DCE0E7" : "black"}
              />
            </motion.div>
          </Group>
        </Group>
      </Container>
    </Footer>
  );
};
