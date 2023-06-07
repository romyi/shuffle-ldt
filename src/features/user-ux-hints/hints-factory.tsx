import { Card, Center, CloseButton, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";

export const createHint = (
  title: string | ReactNode,
  content: ReactNode,
  icon?: ReactNode
) => {
  return ({ cols, initialOpen }: { cols?: string; initialOpen?: boolean }) => {
    const [opened, { open, close }] = useDisclosure(
      typeof initialOpen === "boolean" ? initialOpen : true
    );
    if (opened) {
      return (
        <Card
          h="max-content"
          shadow={"xs"}
          radius="md"
          sx={{ gridColumn: cols || "auto" }}
        >
          <Card.Section p="sm">
            {typeof title === "string" ? (
              <Group position={"apart"}>
                <Text color={"dimmed"} size={"xs"} weight="400">
                  {title}
                </Text>
                <CloseButton onClick={close} />
              </Group>
            ) : (
              title
            )}
          </Card.Section>
          <Card.Section p="sm">{content}</Card.Section>
        </Card>
      );
    } else {
      return icon ? (
        <Center sx={{ cursor: "pointer" }} onClick={open}>
          {icon}
        </Center>
      ) : null;
    }
  };
};
