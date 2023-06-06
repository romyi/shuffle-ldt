import { Card, Center, CloseButton, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";

export const CalculationsHint = () => {
  const [opened, { open, close }] = useDisclosure(true);
  if (opened) {
    return (
      <Card h="max-content" shadow={"xs"} radius="md">
        <Card.Section p="sm">
          <Group position={"apart"}>
            <Text color={"dimmed"} size={"xs"} weight="400">
              Что здесь можно делать?
            </Text>
            <CloseButton onClick={close} />
          </Group>
        </Card.Section>
        <Card.Section p="sm">
          <Text size={"xs"} maw="220px">
            На странице представлены ваши расчёты, сделанные за все время.
            Сравнивайте их между собой, просматривайте и скачивайте .pdf
          </Text>
        </Card.Section>
      </Card>
    );
  } else {
    return (
      <Center sx={{ cursor: "pointer" }} onClick={open}>
        <IconInfoCircle stroke={1.5} />
      </Center>
    );
  }
};
