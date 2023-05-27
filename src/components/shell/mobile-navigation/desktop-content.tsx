import { useClearSnapshot } from "@features/follow-user-calculation-experience/hooks/useClearSnapshot";
import { Container, Text, Stack, NavLink, SimpleGrid } from "@mantine/core";
import { ui } from "@states/ui_state";
import { IconFileCheck, IconTablePlus } from "@tabler/icons-react";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

export const DesktopContent = () => {
  const [uistate, setuistate] = useRecoilState(ui);
  const navigate = useNavigate();
  const clearShapshot = useClearSnapshot();
  return (
    <Container mt="md" size={"md"} p="md" h="400px">
      <SimpleGrid cols={3}>
        <Stack>
          <Text size={"sm"}>Расчёты</Text>
          <NavLink
            variant={"subtle"}
            color="dark"
            active={Boolean(useMatch("/calculation"))}
            label="Новый"
            description="Если Вы начинали заполнять данные в калькуляторе, они будут утеряны"
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
        <Stack>
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
      </SimpleGrid>
    </Container>
  );
};
