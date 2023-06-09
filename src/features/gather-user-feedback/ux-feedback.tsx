import { useDisclosure } from "@mantine/hooks";
import { provideUxFeedback } from "@network/mutations";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Feedback, Front, Success } from "./general-model-feedback";

export const UxFeedback = () => {
  const [opened, { open, close }] = useDisclosure();
  const [success, setsuccess] = useState(false);
  const { mutate: feedback, isLoading } = useMutation(provideUxFeedback, {
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
          metric="Насколько вам удобно пользоваться сервисом?"
          close={close}
          feedback={feedback}
          isLoading={isLoading}
        />
      );
    }
  } else {
    return <Front text="Оцените интерфейс" open={open} />;
  }
};
