import { useClearSnapshot } from "@features/follow-user-calculation-experience/hooks/useClearSnapshot";
import { Container, Text, Stack, NavLink } from "@mantine/core";
import { keys } from "@network/index";
import { ui } from "@states/ui";
import { IconFileCheck, IconTablePlus } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

export const MobileContent = () => {
  const client = useQueryClient();

  const [uistate, setuistate] = useRecoilState(ui);
  const navigate = useNavigate();
  const clearShapshot = useClearSnapshot();
  const data = client.getQueryData(keys.user.me().queryKey);

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
            active={Boolean(useMatch("/"))}
            label="Список"
            description="Просмотреть список расчётов"
            icon={<IconFileCheck size={24} />}
            onClick={() => {
              setuistate({ ...uistate, drawer: null });
              navigate("/");
            }}
          />
        </Stack>
        <Text size={"sm"}>Управление</Text>
        <NavLink
          color={"dark"}
          variant={"subtle"}
          active={Boolean(useMatch("/user"))}
          label={data ? "Ваш профиль" : "Регистрация"}
          description={
            data
              ? "Редактирование личных данных и настройки"
              : "Заполнить ИНН, ФИО и получить подробный отчет"
          }
          icon={<IconFileCheck size={24} />}
          onClick={() => {
            setuistate({ ...uistate, drawer: null });
            navigate("/user");
          }}
        />
      </Stack>
    </Container>
  );
};
