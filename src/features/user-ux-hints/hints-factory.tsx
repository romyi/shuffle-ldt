import { Card, Center, CloseButton, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

export const createHint = (
  title: string | ReactNode,
  content: ReactNode,
  icon?: ReactNode
) => {
  return ({
    cols,
    initialOpen,
    link,
  }: {
    cols?: string;
    initialOpen?: boolean;
    link?: ReactNode;
  }) => {
    const [opened, { open, close }] = useDisclosure(
      typeof initialOpen === "boolean" ? initialOpen : true
    );
    if (opened) {
      return (
        <AnimatePresence>
          <motion.div
            initial={{ translateX: "-200px", opacity: 0 }}
            animate={{ translateX: "0px", opacity: 1 }}
            exit={{ translateX: "200px", opacity: 1 }}
          >
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
              <Card.Section p="sm">{link}</Card.Section>
            </Card>
          </motion.div>
        </AnimatePresence>
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
