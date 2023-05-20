import { Alert, AppShell, Container, Text } from "@mantine/core";
import { AppHeader } from "@components/shell";
import { IconNotification } from "@tabler/icons-react";

function App() {
  return (
    <AppShell header={<AppHeader />}>
      <Container>
        <Alert
          color={"cyan"}
          title="Добро пожаловать"
          icon={<IconNotification />}
        >
          <Text>
            Очень скоро здесь появятся сервисы для организации промышленного
            производства в Москве
          </Text>
        </Alert>
      </Container>
    </AppShell>
  );
}

export default App;
