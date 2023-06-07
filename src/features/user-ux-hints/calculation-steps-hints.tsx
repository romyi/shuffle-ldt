import { SMALL_SCREEN_EXTENT } from "@const";
import { Text, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconFingerprint, IconMouse } from "@tabler/icons-react";

const PickIcon = () => {
  const small = useMediaQuery(SMALL_SCREEN_EXTENT);
  const theme = useMantineTheme();
  return small ? (
    <IconFingerprint color={theme.colors.pink[6]} />
  ) : (
    <IconMouse color={theme.colors.pink[6]} />
  );
};

export const PickRegionHint = () => {
  return (
    <>
      <PickIcon />
      <Text size="sm" mt="md" maw={160}>
        Нажмите на карту и выберите регион
      </Text>
    </>
  );
};

export const ProceedSquareInput = () => {
  return (
    <>
      <PickIcon />
      <Text size={"sm"} mt="md" maw={160}>
        Нажмите сюда, чтобы перейти к указанию площадей
      </Text>
    </>
  );
};

export const ProceedStatsInput = () => {
  return (
    <>
      <PickIcon />
      <Text size={"sm"} mt="0" maw={160}>
        Нажмите сюда, чтобы перейти к указанию информации о предприятии
      </Text>
    </>
  );
};
