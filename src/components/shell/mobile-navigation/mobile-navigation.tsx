import { useClearSnapshot } from "@features/follow-user-calculation-experience/hooks/useClearSnapshot";
import {
  Drawer,
  createStyles,
  Container,
  Text,
  Stack,
  NavLink,
} from "@mantine/core";
import { calculation_state } from "@states/calculation";
import { ui } from "@states/ui_state";
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
  const [uistate, setuistate] = useRecoilState(ui);
  const onDrawerClose = () => setuistate({ ...uistate, drawer: null });
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [calculation, setcalculation] = useRecoilState(calculation_state);
  const clear = useClearSnapshot();
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
              onClick={() => {
                clear();
                setuistate({ ...uistate, drawer: null });
                navigate("/calculation");
              }}
            />
            <NavLink
              maw={320}
              variant={"subtle"}
              color="dark"
              active={Boolean(useMatch("/reports"))}
              label="Список"
              description="Просмотреть список расчётов"
              icon={<IconFileCheck size={24} />}
              onClick={() => {
                // setuistate({ ...uistate, drawer: null });
                navigate("/reports");
              }}
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
            onClick={() => {
              // setuistate({ ...uistate, drawer: null });
              navigate("/");
            }}
          />
        </Stack>
      </Container>
    </Drawer>
  );
};
