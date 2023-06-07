import { Group, Stack, Text } from "@mantine/core";
import { IconHelpCircle } from "@tabler/icons-react";
import { createHint } from "./hints-factory";

export const SquareInputsHint = createHint(
  "Справка",
  <Stack spacing={"xs"}>
    <Text size="xs" color="pink">
      1. Общая площадь
    </Text>
    <Text size={"xs"}>
      В расчёте мы учитываем общую площадь участков и объектов капитального
      строительства, то есть, если в распоряжении планируется иметь несколько
      участков/построек - укажите их совокупную площадь в соответствующем поле.
    </Text>
    <Text mt="lg" size="xs" color={"pink"}>
      2. Есть арендованные участки?
    </Text>
    <Text size={"xs"}>
      Если какой-либо из участков находится не в собственности и используется в
      аренду, рекомендуем вам отметить это на форме. То же самое касается
      производственных сооружений.
    </Text>
    <Text mt="lg" size="xs" color="pink">
      3. Коммунальные услуги на сооружениях
    </Text>
    <Text size={"xs"}>
      Подключение инфраструктуры к коммуникациям будет включено в расчет. Однако
      <strong>
        {" "}
        объем средств, затраченный на уплату коммунальных услуг за год, не будет
        включен в результат.
      </strong>{" "}
      Мы работаем над этим, и вскоре этот параметр также будет учитываться.
    </Text>
  </Stack>,
  <Group>
    <Text color="dimmed" size={"xs"}>
      Нажмите, чтобы ознакомиться с пояснением нюансов
    </Text>
    <IconHelpCircle color="gray" stroke={1.5} />
  </Group>
);

export const StatsInputsHint = createHint(
  "Справка",
  <Stack spacing={"xs"}>
    <Text size="xs" color="pink">
      1. ФОТ НДФЛ и Страхование
    </Text>
    <Text size={"xs"}>
      Данные позиции будут включены в расчёт, вам нужно лишь указать количество
      работников на предприятии.
    </Text>
    <Text mt="lg" size="xs" color={"pink"}>
      2. Оборудование. Количество
    </Text>
    <Text size={"xs"}>
      Указывайте только ключевые машины, станки и линии для вашей отрасли -
      уборочная техника, расходные материалы не учитываются.
    </Text>
    <Text mt="lg" size="xs" color="pink">
      3. Оборудование. Стоимость
    </Text>
    <Text size={"xs"}>
      Значительная доля техники на рынках - импортного производства без
      дистрибьюторов в РФ, средняя <strong>розничная</strong> стоимость
      оборудования для выбранной отрасли будет пересчитана по курсу USD от 24
      мая 2023. Обратите внимание на цену в рознице - при расчете используется
      именно она, хотя некоторые производители могут делать оптовый дисконт.
    </Text>
    <Text mt="lg" size="xs" color="pink">
      4. Оборудоание. Содержание
    </Text>
    <Text size="xs">
      В расчёте не будут учитываться расходы на транспортировку, наладку и
      годичное обслуживание промышленного оборудования. Мы добавим это в
      будущем.
    </Text>
  </Stack>,
  <Group>
    <Text color="dimmed" size={"xs"}>
      Нажмите, чтобы ознакомиться с пояснением нюансов
    </Text>
    <IconHelpCircle color="gray" stroke={1.5} />
  </Group>
);
