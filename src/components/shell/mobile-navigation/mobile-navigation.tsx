import {
  Drawer,
  createStyles,
  Group,
  Title,
  Container,
  Text,
  Stack,
  Paper,
} from "@mantine/core";
import { nav_drawer_state } from "@states/ui/navigation";
import {
  Icon24Hours,
  Icon3dCubeSphere,
  IconAffiliateFilled,
} from "@tabler/icons-react";
import { useRecoilState } from "recoil";

const useStyles = createStyles(() => ({
  inner: {
    padding: "0px",
  },
  content: {
    borderRadius: "12px 12px 0px 0px",
    height: "fit-content",
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
      <Container size={"sm"} p="md">
        <Stack mih={"320px"} spacing={"sm"} h={"100%"}>
          <Group noWrap>
            <Paper
              w={"max-content"}
              shadow="xs"
              p="sm"
              radius={"md"}
              withBorder={false}
            >
              <Icon24Hours />
            </Paper>
            <Stack spacing={0}>
              <Text>Главная</Text>
            </Stack>
          </Group>
          <Group noWrap>
            <Paper
              w={"min-content"}
              shadow="xs"
              p="sm"
              radius={"md"}
              withBorder={false}
              // sx={(theme) => ({ backgroundColor: theme.colors.red[5] })}
            >
              <Icon3dCubeSphere />
            </Paper>
            <Stack spacing={0}>
              <Text>Профиль</Text>
              <Text size={"xs"} color="dimmed">
                Личные данные
              </Text>
            </Stack>
          </Group>
          <Group noWrap>
            <Paper
              w={"min-content"}
              shadow="xs"
              p="sm"
              radius={"md"}
              withBorder={false}
              // sx={(theme) => ({ backgroundColor: theme.colors.dark[1] })}
            >
              <IconAffiliateFilled />
            </Paper>
            <Stack spacing={0}>
              <Text>PDF report</Text>
              <Text size={"xs"} color="dimmed">
                tap to test
              </Text>
            </Stack>
          </Group>
        </Stack>
      </Container>
    </Drawer>
  );
};
