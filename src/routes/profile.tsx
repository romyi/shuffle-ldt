import { Container, Switch } from "@mantine/core";

export const Profile = () => {
  return (
    <Container size={"xl"}>
      <Switch
        styles={{ body: { alignItems: "center" } }}
        size={"md"}
        label="Подсказки"
        description="Помогаем освоиться в интерфейсе"
      />
    </Container>
  );
};
