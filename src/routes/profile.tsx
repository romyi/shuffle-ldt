import {
  Badge,
  Card,
  Container,
  Overlay,
  PinInput,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";

export const Profile = () => {
  return (
    <Container>
      <SimpleGrid>
        <Stack>
          <Title>Аласкаров Руслан</Title>
          <Card>
            <Overlay opacity={0.2} center>
              <Badge>Нужна регистрация</Badge>
            </Overlay>
            <Text>Должность</Text>
            <Text>Начальник</Text>
          </Card>
        </Stack>
        <Title>ПАО Сбербанк</Title>
        <Stack>
          <Title>Код</Title>
          <PinInput size={"xl"} length={6} />
        </Stack>
      </SimpleGrid>
    </Container>
  );
};
