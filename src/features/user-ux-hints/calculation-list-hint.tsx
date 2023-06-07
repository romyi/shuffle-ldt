import { Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { createHint } from "./hints-factory";

export const CalculationsHint = createHint(
  "Что здесь можно делать?",
  <Text size={"xs"} maw="220px">
    На странице представлены ваши расчёты, сделанные за все время. Сравнивайте
    их между собой, просматривайте и скачивайте .pdf
  </Text>,
  <IconInfoCircle stroke={1.5} />
);
