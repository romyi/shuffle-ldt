import {
  Accordion,
  Button,
  Group,
  LoadingOverlay,
  Rating,
  Stack,
  Text,
} from "@mantine/core";
import { FeedCalculation, FeedCommon } from "@tyles/feedbacks";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useSearchParams } from "react-router-dom";

export const UniversalItem: React.FC<{
  item: FeedCalculation | FeedCommon;
  remove: (arg0: string) => void;
  isLoading: boolean;
}> = (props) => {
  const [params] = useSearchParams();

  return (
    <Accordion.Item
      sx={{ position: "relative" }}
      key={props.item.id}
      value={props.item.id}
    >
      <LoadingOverlay
        visible={props.isLoading && params.get("id") === props.item.id}
      />

      <Accordion.Control>
        <Group position="left" noWrap align={"center"}>
          <Text maw="160px" lineClamp={2} size="xs" weight={"400"}>
            {props.item.authorEmail || "анонимный"}
          </Text>
          <Stack ml="auto" spacing={0}>
            <Text size={"10px"}>
              {format(new Date(props.item.date), "dd.MM", {
                locale: ru,
              })}
            </Text>
            <Text size={"10px"} color="dimmed">
              {format(new Date(props.item.date), "HH:mm", {
                locale: ru,
              })}
            </Text>
          </Stack>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Group noWrap spacing={"xl"} position="apart">
          <Text>{props.item.comment}</Text>
          <Stack>
            <Rating readOnly size={"xs"} value={props.item.score} />
            <Button
              variant={"subtle"}
              color="pink"
              size="xs"
              onClick={() => props.remove(props.item.id)}
            >
              удалить
            </Button>
          </Stack>
        </Group>
      </Accordion.Panel>
    </Accordion.Item>
  );
};
