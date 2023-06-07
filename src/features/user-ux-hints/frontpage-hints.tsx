import { Button, Stack, Text } from "@mantine/core";
import { createHint } from "./hints-factory";

export const BriefHint = createHint(
  <Text size={"xl"} weight="bold" color="pink" variant={"gradient"}>
    Рассчитайте стоимость запуска предприятия
  </Text>,
  <Stack>
    <Text>
      Наша задача - помочь вам в организации своего промышленного производства в
      Москве. Модели машинного обучения подскажут сумму содержания предприятия
      за первый год работы.
    </Text>
    <Button color={"cyan"} variant="gradient">
      Сделать расчёт
    </Button>
  </Stack>
);

export const UiSummaryHint = createHint(
  "Как ориентироваться?",
  <Text>Вот значки</Text>
);
