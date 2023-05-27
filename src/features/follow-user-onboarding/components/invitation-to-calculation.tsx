import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const InvitationToCalculation = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/calculation");
  return <Button onClick={handleClick}>Сделать расчёт</Button>;
};
