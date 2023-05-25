import { Logo } from "@components/ui-containers";
import { Badge, Image, Navbar, NavLink, Stack, Text } from "@mantine/core";
import {
  IconFileCheck,
  IconListSearch,
  IconTablePlus,
} from "@tabler/icons-react";
import { useMatch, useNavigate } from "react-router-dom";
import Moscow from "/moscow.svg";

export const BigNavbar = () => {
  const navigate = useNavigate();
  return (
    <Navbar
      zIndex={110}
      height={"100%"}
      hiddenBreakpoint={"md"}
      hidden={true}
      width={{ xs: 0, sm: 0, md: 280 }}
      withBorder
      p={"lg"}
      position={{ top: 0, left: 0 }}
    >
      <Logo />
      <Image mt={"md"} width={28} src={Moscow} />

      <Stack mt="48px" spacing={"xs"}>
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
          variant={"subtle"}
          color="dark"
          active={Boolean(useMatch("/reports"))}
          label="Список"
          description="Просмотреть список расчётов"
          icon={<IconListSearch size={24} />}
          rightSection={<Badge>1</Badge>}
          onClick={() => navigate("/reports")}
        />
      </Stack>
      <Stack mt="auto" mb="xl" spacing={"xs"}>
        <Text color="#DCE0E7">Гость</Text>
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
    </Navbar>
  );
};
