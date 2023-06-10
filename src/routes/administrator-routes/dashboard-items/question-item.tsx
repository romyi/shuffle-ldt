import {
  Accordion,
  Button,
  Group,
  LoadingOverlay,
  Stack,
  Text,
} from "@mantine/core";
import { Feed, FeedCommon, FeedQuestion } from "@tyles/feedbacks";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useSearchParams } from "react-router-dom";

export const QuestionItem: React.FC<{
  question: FeedQuestion;
  remove: (arg0: string) => void;
  isLoading: boolean;
}> = (props) => {
  const [params] = useSearchParams();

  return (
    <Accordion.Item
      sx={{ position: "relative" }}
      key={props.question.id}
      value={props.question.id}
    >
      <LoadingOverlay
        visible={props.isLoading && params.get("id") === props.question.id}
      />

      <Accordion.Control>
        <Group position={"apart"}>
          <Text size="sm" color="dimmed">
            {props.question.authorEmail || "Анонимный"}
          </Text>
          <Stack ml="auto" spacing={0}>
            <Text size={"10px"}>
              {format(new Date(props.question.date), "dd.MM", {
                locale: ru,
              })}
            </Text>
            <Text size={"10px"} color="dimmed">
              {format(new Date(props.question.date), "HH:mm", {
                locale: ru,
              })}
            </Text>
          </Stack>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Group noWrap spacing={"xl"} position="apart">
          <Text size="xs">{props.question.comment}</Text>
          <Button
            variant={"subtle"}
            color="pink"
            size="xs"
            onClick={() => props.remove(props.question.id)}
          >
            удалить
          </Button>
        </Group>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export const isQuestion = (f: Feed): f is FeedQuestion =>
  (f as FeedCommon).score === undefined;
