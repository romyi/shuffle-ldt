import { Accordion, Group, Stack, Text } from "@mantine/core";
import { Feed, FeedCommon, FeedQuestion } from "@tyles/feedbacks";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const QuestionItem: React.FC<FeedQuestion> = (props) => {
  return (
    <Accordion.Item key={props.id} value={props.id}>
      <Accordion.Control>
        <Group position={"apart"}>
          <Text size="sm" color="dimmed">
            {props.authorEmail || "Анонимный"}
          </Text>
          <Stack ml="auto" spacing={0}>
            <Text size={"10px"}>
              {format(new Date(props.date), "dd.MM", {
                locale: ru,
              })}
            </Text>
            <Text size={"10px"} color="dimmed">
              {format(new Date(props.date), "HH:mm", {
                locale: ru,
              })}
            </Text>
          </Stack>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>{props.comment}</Accordion.Panel>
    </Accordion.Item>
  );
};

export const isQuestion = (f: Feed): f is FeedQuestion =>
  (f as FeedCommon).score === undefined;
