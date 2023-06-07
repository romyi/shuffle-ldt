import { Text } from "@mantine/core";
import { createHint } from "./hints-factory";

export const ProfilePageHint = createHint(
  "Личные данные",
  <Text size={"xs"} color="dimmed">
    Здесь вы по желанию можете оставить данные о себе. Информация используется
    командой сервиса для аналитики и улучшения функциональности.
  </Text>
);
