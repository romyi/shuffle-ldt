import { Card, SimpleGrid, Text } from "@mantine/core";
import { keys } from "@network/index";
import { useQueryClient } from "@tanstack/react-query";
import {
  Feed,
  FeedAlarm,
  FeedCalculation,
  FeedCommon,
  FeedQuestion,
} from "@tyles/feedbacks";
import { format, isSameDay } from "date-fns";
import { ru } from "date-fns/locale";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const isToday = (items: Array<{ date: string }>): number =>
  items.filter((item) => isSameDay(new Date(item.date), new Date())).length;

export const FeedbackSummary: React.FC<{
  settargetlist: (arg0: Array<Feed> | undefined) => void;
}> = ({ settargetlist }) => {
  const client = useQueryClient();
  const [params, setparams] = useSearchParams();
  useEffect(() => {
    setparams({ category: "alarm" });
  }, []);

  const data = client.getQueryData<{
    common: FeedCommon[];
    alarm: FeedAlarm[];
    question: FeedQuestion[];
    calculation: FeedCalculation[];
  }>(keys.feedback.all().queryKey);

  return (
    <Card sx={{ height: "300px" }} radius={"sm"} shadow={"sm"}>
      <Card.Section p="sm">
        <SimpleGrid cols={3}>
          <Text sx={{ gridColumnStart: 2, gridColumnEnd: 3 }} size="xs">
            Всего
          </Text>
          <Text
            sx={{ gridColumnStart: 3, gridColumnEnd: 4 }}
            color="cyan"
            size="xs"
          >
            за {format(new Date(), "d MMMM", { locale: ru })}
          </Text>
          <Text
            color={params.get("category") === "calculation" ? "pink" : "dark"}
            sx={{ cursor: "pointer" }}
            onClick={() => {
              settargetlist(data?.calculation);
              params.set("category", "calculation");
            }}
            size="xs"
          >
            Полнота и качество данных{" "}
          </Text>
          <Text>{data?.calculation.length}</Text>
          <Text color={"cyan"}>
            {data?.calculation && isToday(data?.calculation)
              ? `+ ${isToday(data?.calculation)} `
              : ""}
          </Text>
          <Text
            color={params.get("category") === "common" ? "pink" : "dark"}
            sx={{ cursor: "pointer" }}
            onClick={() => {
              settargetlist(data?.common);
              params.set("category", "common");
            }}
            size="xs"
          >
            Общие впечатления
          </Text>
          <Text>{data?.common.length}</Text>
          <Text color={"cyan"}>
            {data?.common && isToday(data?.common)
              ? `+ ${isToday(data?.common)}`
              : ""}
          </Text>
          <Text
            color={params.get("category") === "questions" ? "pink" : "dark"}
            sx={{ cursor: "pointer" }}
            onClick={() => {
              settargetlist(data?.question);
              params.set("category", "questions");
            }}
            size="xs"
          >
            Вопросы
          </Text>
          <Text>{data?.question.length}</Text>
          <Text color={"cyan"}>
            {data?.question && isToday(data?.question)
              ? `+ ${isToday(data?.question)}`
              : ""}
          </Text>
          <Text
            color={params.get("category") === "alarm" ? "pink" : "dark"}
            sx={{ cursor: "pointer" }}
            onClick={() => {
              settargetlist(data?.alarm);
              params.set("category", "alarm");
            }}
            size="xs"
          >
            Тревожные кнопки
          </Text>
          <Text>{data?.alarm.length}</Text>
          <Text color={"cyan"}>
            {data?.alarm && isToday(data?.alarm)
              ? `+ ${isToday(data?.alarm)}`
              : ""}
          </Text>
          {data?.calculation && data.common && (
            <>
              <Text>Оценка</Text>
              <Text>
                {(
                  data?.common.reduce((acc, items) => acc + items.score, 0) +
                  data?.calculation.reduce(
                    (acc, items) => acc + items.score,
                    0
                  ) /
                    (data?.common.length + data?.calculation.length)
                ).toFixed(2)}
              </Text>
            </>
          )}
        </SimpleGrid>
      </Card.Section>
    </Card>
  );
};
