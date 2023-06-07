import { Text, Title } from "@mantine/core";
import { createHint } from "./hints-factory";

export const BriefHint = createHint(
  <Title order={2}>Рассчитайте стоимость запуска</Title>,
  <Text>Первого года</Text>
);

export const UiSummaryHint = createHint(
  "Как ориентироваться?",
  <Text>Вот значки</Text>
);
