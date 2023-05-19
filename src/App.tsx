import {
  AppShell,
  Box,
  Button,
  Container,
  Group,
  Header,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Moscow from "/moscow.svg";

function App() {
  return (
    <AppShell
      padding={"md"}
      header={
        <Header withBorder={false} height={60}>
          <Container sx={{ height: "100%" }}>
            <Stack justify={"center"} sx={{ height: "100%" }}>
              <Group position="left" spacing={"lg"}>
                <img alt="moscow" src={Moscow} />
                <Text weight={800}>
                  Департамент инвестиционной политики Москвы
                </Text>
              </Group>
            </Stack>
          </Container>
        </Header>
      }
    >
      <Container>
        <Box>
          <Title>Заголовок</Title>
          <Text>Текст</Text>
          <Button variant={"outline"} size={"sm"}>
            Применить
          </Button>
        </Box>
      </Container>
    </AppShell>
  );
}

export default App;
