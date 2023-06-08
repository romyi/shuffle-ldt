import { SMALL_SCREEN_EXTENT } from "@const";
import { UserQuestion } from "@features/gather-user-feedback";
import { FrequentlyAskedHint, QuestionHint } from "@features/user-ux-hints";
import { Container, SimpleGrid, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export const Questions = () => {
  const small = useMediaQuery(SMALL_SCREEN_EXTENT);
  return (
    <Container p={small ? "0px" : "sm"}>
      <Title>Задать вопрос</Title>
      <SimpleGrid>
        <QuestionHint />
        <FrequentlyAskedHint />
        <UserQuestion />
      </SimpleGrid>
    </Container>
  );
};
