import { useClearSnapshot } from "@features/follow-user-calculation-experience";
import { Alert, Button, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const InvitationToCalculation = () => {
  const navigate = useNavigate();
  const clearSnapshot = useClearSnapshot();
  const handleClick = () => {
    clearSnapshot();

    navigate("/calculation");
  };
  return (
    <Alert color={"cyan"}>
      <Stack>
        <Text>Заполните данные ФИО, ИНН чтобы просматривать все отчеты</Text>
        <Button color={"cyan"} variant="gradient" onClick={handleClick}>
          Сделать расчёт
        </Button>
      </Stack>
    </Alert>
  );
};
