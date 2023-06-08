import { Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { createHint } from "./hints-factory";

export const SnapshotHint = createHint(
  "Ваш новый расчёт",
  <>
    <Text size={"xs"} maw="220px" mb="md">
      Изучите информацию по минимальной и максимальной прогнозируемой стоимости.
      Напомним, речь идет о сумме средств, которую потребует предприятие в
      первый год своей работы.
    </Text>
    <Text color={"pink"} size="xs" maw="220px">
      Более детальная информация доступна в PDF отчете. Для этого мы попросим
      Вас подтвердить почту
    </Text>
  </>,
  <IconInfoCircle stroke={1.5} />
);

export const SnapshotMechanicHint = createHint(
  "Список расчётов",
  <>
    <Text size="xs" maw="220px">
      Пока что здесь будет показан последний сделанный расчет. Список расчётов
      будет доступен после подтверждения почты.
    </Text>
  </>,
  <IconInfoCircle stroke={1.5} />
);
