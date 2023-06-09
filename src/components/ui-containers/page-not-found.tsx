import { Container, Stack, Title } from "@mantine/core";
import { Logo } from "./logo";

export const NoPage = () => {
  return (
    <Container p="md">
      <Stack fz={"sm"} m="auto" maw="420px" spacing="46px" mt="260px">
        <Logo />
        <Title order={3}>Похоже, что у нас нет такой страницы</Title>
      </Stack>
    </Container>
  );
};
