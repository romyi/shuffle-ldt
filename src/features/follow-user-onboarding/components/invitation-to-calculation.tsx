import { useClearSnapshot } from "@features/follow-user-calculation-experience";
import { Button, Stack, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const InvitationToCalculation = () => {
  const navigate = useNavigate();
  const clearSnapshot = useClearSnapshot();
  const handleClick = () => {
    clearSnapshot();

    navigate("/calculation");
  };
  return (
    <Stack spacing={"xs"}>
      <Title weight={800} order={4}>
        Наша задача - помочь вам запустить новое производство в нашем городе.
        Рассчитайте затраты на первый год работы предприятия вместе с нами
      </Title>

      <Button color={"cyan"} variant="gradient" onClick={handleClick}>
        Сделать расчёт
      </Button>
    </Stack>
  );
};
