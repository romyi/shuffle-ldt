import { Logo } from "@components/ui-containers";
import { Image, Navbar, Stack, Text } from "@mantine/core";
import Moscow from "/moscow.svg";

export const BigNavbar = () => {
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
        <Text color={"dimmed"}>Расчёты</Text>
        <Text>Новый</Text>
        <Text>Список</Text>
      </Stack>
      <Stack mt="auto" spacing={"xs"}>
        <Text color={"dimmed"}>Управление</Text>
        <Text>Завершить регистрацию</Text>
      </Stack>
    </Navbar>
  );
};
