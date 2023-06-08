import { SMALL_SCREEN_EXTENT } from "@const";
import { Container, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export const Feedback = () => {
  const small = useMediaQuery(SMALL_SCREEN_EXTENT);
  return (
    <Container p={small ? "0px" : "sm"}>
      <Title>Пользовательская оценка</Title>
      <Text>Скорее всего это будет по страницам раскидано</Text>
    </Container>
  );
};
