import { Card, Center, CloseButton, Group, Rating, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconThumbUp } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

const Front: React.FC<{ open: () => void }> = ({ open }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ translateX: "-200px", opacity: 0 }}
        animate={{ translateX: "0px", opacity: 1 }}
        exit={{ translateX: "200px", opacity: 1 }}
      >
        <Center sx={{ cursor: "pointer" }} onClick={open}>
          <Text mr="xl" maw="120px" size="sm">
            Нажмите, чтобы оценить полноту данных
          </Text>
          <IconThumbUp stroke={1.5} />
        </Center>
      </motion.div>
    </AnimatePresence>
  );
};

const Feedback: React.FC<{ close: () => void }> = ({ close }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ translateX: "-200px", opacity: 0 }}
        animate={{ translateX: "0px", opacity: 1 }}
        exit={{ translateX: "200px", opacity: 1 }}
      >
        <Card shadow={"xs"} radius="md">
          <Card.Section p="sm">
            <Group position={"apart"} align="flex-start" noWrap>
              <Text size={"xs"} weight="400">
                Насколько полезны и ясны данные из отчётов?
              </Text>
              <CloseButton onClick={close} />
            </Group>
            {/* <Textarea maxLength={30} label={"У вас есть пожелания?"} /> */}
          </Card.Section>
          <Card.Section p="sm">
            <Rating />
          </Card.Section>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export const GeneralModelFeedback = () => {
  const [opened, { open, close }] = useDisclosure();
  if (opened) {
    return <Feedback close={close} />;
  } else {
    return <Front open={open} />;
  }
};
