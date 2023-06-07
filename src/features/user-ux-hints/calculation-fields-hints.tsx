import { Group, Text } from "@mantine/core";
import { IconHelpCircle } from "@tabler/icons-react";
import { createHint } from "./hints-factory";

export const SquareInputsHint = createHint(
  "Что мы имеем в виду под площадями?",
  <Text size={"xs"} color="dimmed">
    Справка
  </Text>,
  <Group>
    <Text color="dimmed" size={"xs"}>
      Нажмите, чтобы ознакомиться с пояснением
    </Text>
    <IconHelpCircle color="gray" stroke={1.5} />
  </Group>
);

export const StatsInputsHint = createHint(
  "Как информация принимается в расчет?",
  <Text size={"xs"} color="dimmed">
    Пояснение
  </Text>,
  <Group>
    <Text color="dimmed" size={"xs"}>
      Нажмите, чтобы ознакомиться с пояснением
    </Text>
    <IconHelpCircle color="gray" stroke={1.5} />
  </Group>
);
