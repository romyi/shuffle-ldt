import { Button, LoadingOverlay, Stack, Text } from "@mantine/core";
import { keys } from "@network/index";
import { calculation_state } from "@states/calculation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

export const LaunchCalculation: React.FC<{
  calculationIsOnCheck: boolean;
  setCheck: (arg0: boolean) => void;
}> = ({ calculationIsOnCheck, setCheck }) => {
  const [start, setstart] = useState(false);

  const calculation = useRecoilValue(calculation_state);
  const navigate = useNavigate();
  const client = useQueryClient();
  const { isFetching } = useQuery({
    ...keys.reports.create({
      ...calculation.snapshot,
      branch: Number(calculation.snapshot.branch),
    }),
    enabled: start,
    onSuccess: (data) => {
      localStorage.setItem(
        "report",
        JSON.stringify({
          from: data.from,
          to: data.to,
          time: new Date().toISOString(),
        })
      );
      client
        .invalidateQueries({ queryKey: keys.reports.list().queryKey })
        .then(() => navigate("/"));
    },
  });
  return (
    <>
      <LoadingOverlay zIndex={300} visible={isFetching} />
      <Stack>
        {calculationIsOnCheck && (
          <Button
            onClick={() => setCheck(false)}
            variant={"outline"}
            radius={"md"}
            size={"md"}
            color="dark"
          >
            Поправить
          </Button>
        )}
        <Button
          onClick={
            calculationIsOnCheck
              ? () => {
                  setstart(true);
                }
              : () => setCheck(true)
          }
          radius={"md"}
          size={"md"}
        >
          {calculationIsOnCheck ? "Отправить" : "Проверить"}
        </Button>
        {!calculationIsOnCheck && (
          <Text size="xs">
            Проверьте информацию и нажмите отправить, если все верно
          </Text>
        )}
      </Stack>
    </>
  );
};
