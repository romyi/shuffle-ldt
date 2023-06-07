import { useClearSnapshot } from "@features/follow-user-calculation-experience/hooks/useClearSnapshot";
import { Container, Text, Stack, NavLink } from "@mantine/core";
import { keys } from "@network/index";
import { ui } from "@states/ui";
import {
  IconBellQuestion,
  IconFileCheck,
  IconMoodCheck,
  IconTablePlus,
} from "@tabler/icons-react";
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
    <Container mt="md" size={"xs"} p="md" h="580px">
      <Stack spacing={"0px"}>
        <Text mb="md" size={"sm"}>
          Расчёты
        </Text>
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
        <Text mb="md" mt="md" size={"sm"}>
          Управление
        </Text>
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
        <Text mb="md" mt="md" size={"sm"}>
          Обратная связь
        </Text>
        <NavLink
          maw={320}
          variant={"subtle"}
          color="dark"
          active={Boolean(useMatch("/"))}
          label="Задать вопрос"
          description="Хотите что-либо узнать у нас или дать совет? Будем рады"
          icon={<IconBellQuestion size={24} />}
          onClick={() => {
            setuistate({ ...uistate, drawer: null });
            navigate("/");
          }}
        />
        <NavLink
          maw={320}
          variant={"subtle"}
          color="dark"
          active={Boolean(useMatch("/"))}
          label="Дать оценку"
          description="Узнать Ваше мнение о сервисе будет полезно и интересно для нас"
          icon={<IconMoodCheck size={24} />}
          onClick={() => {
            setuistate({ ...uistate, drawer: null });
            navigate("/");
          }}
        />
      </Stack>
    </Container>
  );
};
