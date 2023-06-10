import { SMALL_SCREEN_EXTENT } from "@const";
import {
  Accordion,
  Container,
  Pagination,
  SimpleGrid,
  Stack,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { deleteFeedback, keys } from "@network/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Feed } from "@tyles/feedbacks";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  AlarmItem,
  isAlarm,
  isQuestion,
  QuestionItem,
  UniversalItem,
} from "./dashboard-items";
import { FeedbackSummary } from "./feedback-summary";

export const Dashboard = () => {
  const { data } = useQuery(keys.feedback.all());
  const query = useQueryClient();
  const { mutate: remove, isLoading } = useMutation(deleteFeedback, {
    onSuccess: () =>
      query.invalidateQueries({ queryKey: keys.feedback.all().queryKey }),
  });
  const [targetlist, settargetlist] = useState<Array<Feed> | undefined>([]);
  useEffect(() => data && settargetlist(data.alarm), [data]);
  const small = useMediaQuery(SMALL_SCREEN_EXTENT);
  const [, setparam] = useSearchParams();
  const [page, setpage] = useState(1);
  return (
    <Container p={small ? "0px" : "sm"}>
      {!small && <Title>Дашборд обратной связи</Title>}
      {targetlist && (
        <Pagination
          opacity={targetlist.length < 5 ? 0.3 : 1}
          mt="46px"
          size={"sm"}
          onChange={(page) => {
            setpage(page);
          }}
          total={Math.ceil(targetlist.length / 5)}
        />
      )}
      <SimpleGrid cols={small ? 1 : 2} mt="xl">
        <Stack>
          <Accordion
            variant="separated"
            onChange={(item) => setparam({ id: item as string })}
          >
            {targetlist &&
              [...targetlist]
                .slice((page - 1) * 5, (page - 1) * 5 + 5)
                .map((item) => {
                  if (isAlarm(item)) {
                    return (
                      <AlarmItem
                        key={item.id}
                        alarm={item}
                        remove={remove}
                        isLoading={isLoading}
                      />
                    );
                  }
                  if (isQuestion(item)) {
                    return (
                      <QuestionItem
                        key={item.id}
                        question={item}
                        remove={remove}
                        isLoading={isLoading}
                      />
                    );
                  }
                  return (
                    <UniversalItem
                      key={item.id}
                      item={item}
                      remove={remove}
                      isLoading={isLoading}
                    />
                  );
                })}
          </Accordion>
        </Stack>
        <FeedbackSummary settargetlist={settargetlist} />
      </SimpleGrid>
    </Container>
  );
};
