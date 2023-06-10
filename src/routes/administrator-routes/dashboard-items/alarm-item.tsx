import { ReportInfo } from "@components/report-item";
import {
  Accordion,
  Button,
  Group,
  LoadingOverlay,
  Stack,
  Text,
} from "@mantine/core";
import { Feed, FeedAlarm } from "@tyles/feedbacks";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useSearchParams } from "react-router-dom";

export const AlarmItem: React.FC<{
  alarm: FeedAlarm;
  remove: (arg0: string) => void;
  isLoading: boolean;
}> = ({ alarm, remove, isLoading }) => {
  const [params] = useSearchParams();
  return (
    <Accordion.Item
      key={alarm.id}
      value={alarm.id}
      sx={{ position: "relative" }}
    >
      <LoadingOverlay visible={isLoading && params.get("id") === alarm.id} />
      <Accordion.Control>
        <Group position="left" noWrap align={"center"}>
          <Text maw="160px" lineClamp={2} size="xs" weight={"400"}>
            {alarm.input.branchName}
          </Text>
          <Stack ml="auto" spacing={0}>
            <Text size={"10px"}>
              {format(new Date(alarm.date), "dd.MM", {
                locale: ru,
              })}
            </Text>
            <Text size={"10px"} color="dimmed">
              {format(new Date(alarm.date), "HH:mm", {
                locale: ru,
              })}
            </Text>
          </Stack>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Text size={"xs"}>{alarm.authorEmail || "анонимный"}</Text>
        <Group mt="xl" m="4px" fz={"xs"} spacing={"xl"}>
          <ReportInfo>
            <Text>{alarm.input.personnel}</Text>
            <Text color="dimmed">человек</Text>
          </ReportInfo>
          <ReportInfo>
            <Text>{alarm.input.landSquare} м²</Text>
            <Text color="dimmed">участок</Text>
          </ReportInfo>
          <ReportInfo>
            <Text>{alarm.input.facilitySquare} м²</Text>
            <Text color="dimmed"> постройки</Text>
          </ReportInfo>
          <Button
            variant={"subtle"}
            color="pink"
            size="xs"
            onClick={() => remove(alarm.id)}
          >
            удалить
          </Button>
        </Group>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export const isAlarm = (f: Feed): f is FeedAlarm => {
  return (f as FeedAlarm).input !== undefined;
};
