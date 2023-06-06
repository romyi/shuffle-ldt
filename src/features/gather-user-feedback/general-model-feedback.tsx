import { Card, Center, CloseButton, Group, Rating, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconThumbUp } from "@tabler/icons-react";

export const GeneralModelFeedback = () => {
  const [opened, { open, close }] = useDisclosure();
  if (opened) {
    return (
      <Card shadow={"xs"} radius="md">
        <Card.Section p="sm">
          <Group position={"apart"} align="flex-start" noWrap>
            <Text color={"dimmed"} size={"xs"} weight="400">
              Насколько полезны и ясны данные из отчётов?
            </Text>
            <CloseButton onClick={close} />
          </Group>
        </Card.Section>
        <Card.Section p="sm">
          <Rating />
        </Card.Section>
      </Card>
    );
  } else {
    return (
      <Center sx={{ cursor: "pointer" }} onClick={open}>
        <IconThumbUp stroke={1.5} />
      </Center>
    );
  }
};
