import { Stack, Text } from "@mantine/core";
import { IconFaceId } from "@tabler/icons-react";
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
  <Text size="xs">
    Для того, чтобы обратная связь была более результативной, а сервис
    развивался быстрее, вы можете заполнить информацию о себе. Для этого
    воспользуйтесь меню внизу и перейдите в профиль.
  </Text>,
  <Stack align={"center"}>
    <Text ta="center" size="xs" maw="220px">
      У вас появился профиль. Мы объясним что это и зачем.
    </Text>
    <IconFaceId stroke={1.5} />
  </Stack>
);
