import { useClearSnapshot } from "@features/follow-user-calculation-experience/hooks/useClearSnapshot";
import { Container, Text, Stack, NavLink } from "@mantine/core";
import { ui } from "@states/ui_state";
import { IconFileCheck, IconTablePlus } from "@tabler/icons-react";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

export const MobileContent = () => {
  const [uistate, setuistate] = useRecoilState(ui);
  const navigate = useNavigate();
  const clearShapshot = useClearSnapshot();
  return (
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
              clearShapshot();
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
              setuistate({ ...uistate, drawer: null });
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
            setuistate({ ...uistate, drawer: null });
            navigate("/");
          }}
        />
      </Stack>
    </Container>
  );
};