import {
  Button,
  Drawer,
  Group,
  Paper,
  Stack,
  Text,
  createStyles,
} from "@mantine/core";
import { useRecoilState } from "recoil";
import { drawer_state } from "../../../states";
import { IconApps, IconPlant } from "@tabler/icons-react";

const useStyles = createStyles(() => ({
  inner: {
    padding: "10px",
  },
  content: {
    borderRadius: "12px",
  },
}));

export const MobileDrawer = () => {
  const [drawer, setDrawer] = useRecoilState(drawer_state);
  const onDrawerClose = () => setDrawer({ isOpen: false });
  const { classes } = useStyles();
  return (
    <Drawer
      classNames={{ inner: classes.inner, content: classes.content }}
      padding={"md"}
      overlayProps={{ opacity: 0.05 }}
      size={"sm"}
      closeOnClickOutside
      position="bottom"
      withCloseButton={false}
      opened={drawer.isOpen}
      onClose={onDrawerClose}
    >
      <Stack mih={"320px"} spacing={"sm"} h={"100%"}>
        <Group noWrap>
          <Paper
            w={"max-content"}
            shadow="xs"
            p="sm"
            radius={"md"}
            withBorder={false}
          >
            <IconApps />
          </Paper>
          <Stack spacing={0}>
            <Text>Калькулятор запуска</Text>
            <Text size={"xs"} color="dimmed">
              Используем более 30 параметров при подсчете
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
            // sx={(theme) => ({ backgroundColor: theme.colors.red[5] })}
          >
            <IconPlant />
          </Paper>
          <Stack spacing={0}>
            <Text>Инвестиционное предложение</Text>
            <Text size={"xs"} color="dimmed">
              На основе профиля промышленника и его предприятия.{" "}
              <Text size={"xs"} color="cyan" component="span">
                Потребуется регистрация
              </Text>
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
            <IconPlant />
          </Paper>
          <Stack spacing={0}>
            <Text>PDF report</Text>
            <Text size={"xs"} color="dimmed">
              tap to test
            </Text>
          </Stack>
        </Group>
        <Button mt="auto" color="cyan">
          Register
        </Button>
      </Stack>
    </Drawer>
  );
};
