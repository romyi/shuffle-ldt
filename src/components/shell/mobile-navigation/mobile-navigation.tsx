import {
  Drawer,
  createStyles,
  Group,
  Container,
  Text,
  Stack,
  useMantineTheme,
  Badge,
} from "@mantine/core";
import { nav_drawer_state } from "@states/ui/navigation";
import {
  IconFileCheck,
  IconListSearch,
  IconTablePlus,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

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
  const [nDrawer, setNDrawer] = useRecoilState(nav_drawer_state);
  const onDrawerClose = () => setNDrawer({ isOpen: false });
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const navigate = useNavigate();
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
      opened={nDrawer.isOpen}
      onClose={onDrawerClose}
    >
      <Container mt="md" size={"xs"} p="md" h="400px">
        <Stack>
          <>
            <Text fw={600}>Расчёты</Text>
            <Stack pl="xl" spacing={"sm"}>
              <Group onClick={() => navigate("/calculation/geo")}>
                <IconTablePlus color={theme.colors.cyan[8]} size={24} />
                <Text color={theme.colors.cyan[8]}>Новый</Text>
              </Group>
              <Group onClick={() => navigate("/reports")}>
                <IconListSearch size={26} />
                <Text>Список</Text>
                <Badge>1</Badge>
              </Group>
            </Stack>
          </>
          <>
            <Text mt="md" fw={600}>
              Управление
            </Text>
            <Stack pl="xl" spacing={"sm"}>
              <Group onClick={() => navigate("/")}>
                <IconFileCheck size={28} />
                <Text>Завершить регистрацию</Text>
              </Group>
            </Stack>
          </>
        </Stack>
      </Container>
    </Drawer>
  );
};
