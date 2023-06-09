import {
  Button,
  Card,
  CloseButton,
  createStyles,
  Group,
  LoadingOverlay,
  Rating,
  Stack,
  Text,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { provideModelFeedback } from "@network/mutations";
import { IconThumbUp } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const useCommentClasses = createStyles({
  root: {},
  label: {
    display: "none",
  },
  input: {
    border: "none",
    padding: 0,
  },
});

export const Front: React.FC<{ open: () => void; text: string }> = ({
  open,
  text,
}) => {
  const theme = useMantineTheme();
  return (
    <AnimatePresence>
      <motion.div
        initial={{ translateX: "-200px", opacity: 0 }}
        animate={{ translateX: "0px", opacity: 1 }}
        exit={{ translateX: "200px", opacity: 1 }}
      >
        {/* <Center sx={{ cursor: "pointer" }} onClick={open}> */}
        <Stack align={"center"} onClick={open}>
          <Text variant={"gradient"} ta="center" maw="120px" size="xs">
            {text}
          </Text>
          <IconThumbUp color={theme.colors.cyan[8]} stroke={1.5} />
        </Stack>
        {/* </Center> */}
      </motion.div>
    </AnimatePresence>
  );
};

export const Feedback: React.FC<{
  close: () => void;
  feedback: (feedback: { score: number; comment: string | undefined }) => void;
  isLoading: boolean;
  metric: string;
}> = ({ close, feedback, isLoading, metric }) => {
  const { classes } = useCommentClasses();
  const comment = useRef<HTMLTextAreaElement>(null);
  const [rate, setrate] = useState<number>(0);
  const onSendClick = () =>
    feedback({ score: rate, comment: comment.current?.value });
  return (
    <AnimatePresence>
      <motion.div
        initial={{ translateX: "-200px", opacity: 0 }}
        animate={{ translateX: "0px", opacity: 1 }}
        exit={{ translateX: "200px", opacity: 1 }}
      >
        <Card sx={{ position: "relative" }} mb="60px" shadow={"xs"} radius="md">
          <LoadingOverlay visible={isLoading} />
          <Card.Section p="sm">
            <Group position={"apart"} align="flex-start" noWrap>
              <Stack spacing={"xs"}>
                <Text size={"xs"} weight="400">
                  {metric}
                </Text>
                <Text size="xs">Оцените от 1 до 5</Text>
              </Stack>
              <CloseButton onClick={close} />
            </Group>
            {/* <Textarea maxLength={30} label={"У вас есть пожелания?"} /> */}
          </Card.Section>
          <Card.Section p="sm">
            <Rating defaultValue={rate} onChange={(value) => setrate(value)} />
          </Card.Section>
          <Card.Section p="sm">
            <Textarea
              ref={comment}
              maxRows={2}
              maxLength={60}
              autoFocus
              classNames={{
                input: classes.input,
                label: classes.label,
                root: classes.root,
              }}
              size="sm"
              placeholder="Комментарий"
            />
          </Card.Section>
          <Card.Section p="sm">
            <Button onClick={onSendClick} disabled={rate === 0}>
              Отправить
            </Button>
          </Card.Section>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export const Success = () => {
  const theme = useMantineTheme();
  return (
    <AnimatePresence>
      <motion.div
        initial={{ translateX: "-200px", opacity: 0 }}
        animate={{ translateX: "0px", opacity: 1 }}
        exit={{ translateX: "200px", opacity: 1 }}
      >
        <Stack align={"center"}>
          <Text variant={"gradient"} ta="center" maw="120px">
            Спасибо!
          </Text>
          <IconThumbUp color={theme.colors.cyan[8]} stroke={1.5} />
        </Stack>
      </motion.div>
    </AnimatePresence>
  );
};

export const GeneralModelFeedback = () => {
  const [opened, { open, close }] = useDisclosure();
  const [success, setsuccess] = useState(false);
  const { mutate: feedback, isLoading } = useMutation(provideModelFeedback, {
    onSuccess: () => setsuccess(true),
  });
  useEffect(() => {
    if (success) {
      const t = setTimeout(() => {
        close();
      }, 5000);

      return () => {
        clearTimeout(t);
      };
    }
  }, [success, close]);
  if (opened) {
    if (success) {
      return <Success />;
    } else {
      return (
        <Feedback
          metric="Насколько полезны и ясны данные из отчётов?"
          close={close}
          feedback={feedback}
          isLoading={isLoading}
        />
      );
    }
  } else {
    return <Front text="Нажмите, чтобы оценить полноту данных" open={open} />;
  }
};
