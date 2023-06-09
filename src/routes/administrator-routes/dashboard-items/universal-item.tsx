import { Accordion, Group, Rating, Stack, Text } from "@mantine/core";
import { FeedCalculation, FeedCommon } from "@tyles/feedbacks";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const UniversalItem: React.FC<FeedCalculation | FeedCommon> = (
  props
) => {
  return (
    <Accordion.Item key={props.id} value={props.id}>
      <Accordion.Control>
        <Group position="left" noWrap align={"center"}>
          <Text maw="160px" lineClamp={2} size="xs" weight={"400"}>
            {props.authorEmail || "анонимный"}
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
      <Accordion.Panel>
        <Group noWrap spacing={"xl"} position="apart">
          <Text>{props.comment}</Text>
          <Rating readOnly size={"xs"} value={props.score} />
          {/* <Text>{props.score}</Text> */}
        </Group>
      </Accordion.Panel>
    </Accordion.Item>
  );
};
