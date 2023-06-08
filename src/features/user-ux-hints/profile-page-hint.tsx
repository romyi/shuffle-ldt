import { Text } from "@mantine/core";
import { createHint } from "./hints-factory";

export const ProfilePageHint = createHint(
  "Личные данные",
  <Text size={"xs"} color="dimmed">
    Здесь вы по желанию можете оставить данные о себе. Информация используется
    командой сервиса для аналитики и улучшения функциональности.
  </Text>
);

export const InviteProfileHint = createHint(
  "У вас появился профиль",
  <Text size="xs" color="dimmed">
    Для того, чтобы обратная связь была более результативной, а сервис
    развивался быстрее, вы можете заполнить информацию о себе. Для этого
    воспользуйтесь меню внизу и перейдите в профиль.
  </Text>
);
