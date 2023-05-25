import { Group, Progress, Stack, Text, Title } from "@mantine/core";

export const ProgressBar = () => {
  return (
    <Stack spacing={"xs"}>
      <Group>
        <Title order={6}>Шаг 1</Title>
        <Text size={"sm"}>Выберите регион</Text>
      </Group>
      <Progress
        size={"sm"}
        animate
        sections={[
          { value: 4, color: "pink" },
          { value: 10, color: "dark" },
        ]}
      />
    </Stack>
  );
};
