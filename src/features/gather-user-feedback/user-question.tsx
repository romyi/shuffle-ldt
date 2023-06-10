import {
  Button,
  createStyles,
  LoadingOverlay,
  Stack,
  Textarea,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { askQuestion } from "@network/mutations";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { IconCheck } from "@tabler/icons-react";
import { error_notification } from "@const";

const useQuestionFieldClasses = createStyles({
  root: {
    marginTop: "32px",
  },
  label: {
    marginBottom: "24px",
  },
});

export const UserQuestion = () => {
  const { classes } = useQuestionFieldClasses();
  const [ques, setques] = useState("");
  const { mutate: question, isLoading } = useMutation(askQuestion, {
    onSuccess: () => {
      setques("");
      notifications.show({
        sx: { marginTop: "48px" },
        title: "Отравлено",
        message: "Спасибо за проявленный интерес",
        color: "pink",
        icon: <IconCheck size={16} stroke={1.5} />,
        autoClose: 4000,
      });
    },
    onError: () => notifications.show(error_notification),
  });
  const onConfirm = () => question({ comment: ques });
  return (
    <Stack sx={{ gridColumnStart: 1 }}>
      <LoadingOverlay overlayBlur={1.5} visible={isLoading} />
      <Textarea
        value={ques}
        onChange={(event) => setques(event.target.value)}
        label="Спросите нас"
        maxLength={140}
        minLength={1}
        autoFocus
        classNames={{
          root: classes.root,
          label: classes.label,
        }}
        required
        autosize
        size="sm"
        placeholder="от 1 до 140 знаков"
      />
      <Button disabled={ques.length < 20} size="sm" onClick={onConfirm}>
        Отправить
      </Button>
    </Stack>
  );
};
