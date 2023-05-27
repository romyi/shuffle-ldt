import { Group, Stack, Text } from "@mantine/core";

export const Logo = () => (
  <Stack spacing={"0px"}>
    <Group spacing={6}>
      <Text fw={800} size={"lg"}>
        Предприятие
      </Text>
      <Text
        fw={800}
        variant={"gradient"}
        gradient={{ from: "grape", to: "red", deg: 20 }}
        size="lg"
      >
        Москва
      </Text>
    </Group>
    <Text color={"#DCE0E7"} fw={400} maw="240px" size="xs">
      Департамент инвестиционной и промышленной политики Москвы
    </Text>
  </Stack>
);
