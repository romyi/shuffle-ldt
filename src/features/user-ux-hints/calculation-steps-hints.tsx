import { SMALL_SCREEN_EXTENT } from "@const";
import { Text, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconFingerprint, IconMouse } from "@tabler/icons-react";
import { motion } from "framer-motion";

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
      <motion.div
        animate={{
          translateY: [0, -200, -200, -200, 0],
          translateX: [0, 0, 30, 0, 0],
          scale: [1, 1, 1.5, 1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      >
        <PickIcon />
      </motion.div>
      <Text size="sm" mt="md" maw={160}>
        Нажмите на карту и выберите регион
      </Text>
    </>
  );
};

export const ProceedSquareInput = () => {
  return (
    <>
      <motion.div
        animate={{
          translateX: [0, 0, 14, 0, 0],
          scale: [1, 1, 1.2, 1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          repeatDelay: 1,
          ease: "easeInOut",
        }}
      >
        <PickIcon />
      </motion.div>
      <Text size={"xs"} mt="md" maw={160}>
        Нажмите сюда, чтобы перейти к указанию площадей
      </Text>
    </>
  );
};

export const ProceedStatsInput = () => {
  return (
    <>
      <motion.div
        animate={{
          translateX: [0, 0, 14, 0, 0],
          scale: [1, 1, 1.2, 1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          repeatDelay: 1,
          ease: "easeInOut",
        }}
      >
        <PickIcon />
      </motion.div>
      <Text size={"xs"} mt="0" maw={160}>
        Нажмите сюда, чтобы перейти к указанию информации о предприятии
      </Text>
    </>
  );
};
