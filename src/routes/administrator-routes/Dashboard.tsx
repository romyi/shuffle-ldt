import { SMALL_SCREEN_EXTENT } from "@const";
import {
  Accordion,
  Card,
  Container,
  Pagination,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { keys } from "@network/index";
import { useQuery } from "@tanstack/react-query";
import { Feed } from "@tyles/feedbacks";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  AlarmItem,
  isAlarm,
  isQuestion,
  QuestionItem,
  UniversalItem,
} from "./dashboard-items";
import { useStyles } from "./dashboard.classes";

export const Dashboard = () => {
  const { data: alarms } = useQuery(keys.feedbacks.alarm());
  const { data: common } = useQuery(keys.feedbacks.common());
  const { data: question } = useQuery(keys.feedbacks.question());
  const { data: calculations } = useQuery(keys.feedbacks.calculation());
  const [targetlist, settargetlist] = useState<Array<Feed> | undefined>([]);
  useEffect(() => alarms && settargetlist(alarms), [alarms]);
  const small = useMediaQuery(SMALL_SCREEN_EXTENT);
  const [, setparam] = useSearchParams();
  const [page, setpage] = useState(1);
  const { listing, panel } = useStyles();
  return (
    <Container p={small ? "0px" : "sm"}>
      {!small && <Title>Дашборд обратной связи</Title>}
      {targetlist && (
        <Pagination
          opacity={targetlist.length < 5 ? 0.3 : 1}
          mt="46px"
          size={"sm"}
          onChange={(page) => {
            console.log(page);
            setpage(page);
          }}
          total={Math.ceil(targetlist.length / 5)}
        />
      )}
      <SimpleGrid mt="xl">
        <Card sx={panel} radius={"sm"} shadow={"sm"}>
          <Card.Section p="sm">
            <Text size="sm">
              {format(new Date(), "d MMMM", { locale: ru })}
            </Text>
          </Card.Section>
          <Card.Section onClick={() => settargetlist(calculations)} p="sm">
            <Text size="sm">Полнота и качество данных</Text>
          </Card.Section>
          <Card.Section onClick={() => settargetlist(common)} p="sm">
            <Text size="sm">Общие впечатления</Text>
          </Card.Section>
          <Card.Section p="sm">
            <Text onClick={() => settargetlist(question)} size="sm">
              Вопросы
            </Text>
          </Card.Section>
          <Card.Section onClick={() => settargetlist(alarms)} p="sm">
            <Text size="sm">Тревожные кнопки</Text>
          </Card.Section>
        </Card>
        <Stack sx={listing}>
          <Accordion
            variant="separated"
            onChange={(item) => setparam({ id: item as string })}
          >
            {targetlist &&
              [...targetlist]
                .slice((page - 1) * 5, (page - 1) * 5 + 5)
                .map((item) => {
                  if (isAlarm(item)) {
                    return <AlarmItem key={item.id} {...item} />;
                  }
                  if (isQuestion(item)) {
                    return <QuestionItem key={item.id} {...item} />;
                  }
                  return <UniversalItem key={item.id} {...item} />;
                })}
          </Accordion>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};
