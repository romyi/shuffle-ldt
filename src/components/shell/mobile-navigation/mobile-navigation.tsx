import {
  Drawer,
  createStyles,
  Container,
  Text,
  Stack,
  Badge,
  NavLink,
} from "@mantine/core";
import { nav_drawer_state } from "@states/ui/navigation";
import { IconFileCheck, IconTablePlus } from "@tabler/icons-react";
import { useMatch, useNavigate } from "react-router-dom";
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
          <Stack spacing={"xs"}>
            <Text size={"sm"}>Расчёты</Text>
            <NavLink
              variant={"subtle"}
              color="dark"
              active={Boolean(useMatch("/calculation"))}
              label="Новый"
              description="Сделать новый расчет"
              icon={<IconTablePlus size={24} />}
              onClick={() => navigate("/calculation")}
            />
            <NavLink
              ml="-12px"
              maw={320}
              variant={"subtle"}
              color="dark"
              active={Boolean(useMatch("/reports"))}
              label="Список"
              description="Просмотреть список расчётов"
              icon={
                <Badge color={"cyan"} size={"lg"}>
                  1
                </Badge>
              }
              // rightSection={<Badge>1</Badge>}
              onClick={() => navigate("/reports")}
            />
          </Stack>
          <Text size={"sm"}>Управление</Text>
          <NavLink
            color={"dark"}
            variant={"subtle"}
            active={Boolean(useMatch("/user"))}
            label="Завершить регистрацию"
            description="Заполнить ИНН, ФИО и получить подробный отчет"
            icon={<IconFileCheck size={24} />}
            onClick={() => navigate("/")}
          />
        </Stack>
      </Container>
    </Drawer>
  );
};
