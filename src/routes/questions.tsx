import { SMALL_SCREEN_EXTENT } from "@const";
import { FrequentlyAskedHint, QuestionHint } from "@features/user-ux-hints";
import {
  Button,
  Container,
  createStyles,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const useQuestionFieldClasses = createStyles({
  root: {
    marginTop: "32px",
  },
  label: {
    display: "none",
  },
});

export const Questions = () => {
  const small = useMediaQuery(SMALL_SCREEN_EXTENT);
  const { classes } = useQuestionFieldClasses();
  return (
    <Container p={small ? "0px" : "sm"}>
      <Title>Задать вопрос</Title>
      <SimpleGrid>
        <QuestionHint />
        <FrequentlyAskedHint />
        <Stack sx={{ gridColumnStart: 1 }}>
          <TextInput
            maxLength={120}
            autoFocus
            classNames={{
              label: classes.label,
              root: classes.root,
            }}
            size="md"
            placeholder="Напишите свой вопрос здесь"
          />
          <Button maw="200px" size="sm">
            Отправить
          </Button>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};
