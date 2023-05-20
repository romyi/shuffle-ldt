import { AppShell, Container, Stack } from "@mantine/core";
import { AppHeader, CoreCarousel } from "@components/shell";

function App() {
  return (
    <AppShell header={<AppHeader />}>
      {import.meta.env.MODE}
      <br />
      {import.meta.env.VITE_ORIGIN}
      <Container size={"lg"}>
        <Stack>
          <CoreCarousel />
        </Stack>
      </Container>
    </AppShell>
  );
}

export default App;
