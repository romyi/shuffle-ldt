import { Container, Stack, Text } from "@mantine/core";
import { Logo } from "./logo";

export const ErrorBoundaryContent = () => {
  return (
    <Container p="md">
      <Stack fz={"sm"} m="auto" maw="420px" spacing="xl" mt="160px">
        <Logo />
        <Text>
          Похоже что в результате обновлений мы что-то не досмотрели, но
          вероятно это можно исправить. Попробуйте выполнить шаги:
        </Text>
        <Stack spacing={"md"}>
          <Text>
            1. Очистите кэш браузера для сайта{" "}
            <code>https://предприятие.москва/</code>
          </Text>
          <Text>2. Закройте все вкладки, на которых открыт сайт</Text>
        </Stack>
        <Text>
          Если выполнение этих шагов не решило проблему с доступом, то свяжитесь
          с нами по почте predpriyatie.admin@mail.ru
        </Text>
      </Stack>
    </Container>
  );
};
