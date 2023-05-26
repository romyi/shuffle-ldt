import { calculation_step } from "@states/ui";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

export const useRestoreStep = () => {
  const navigate = useNavigate();
  const calculation = useRecoilValue(calculation_step);
  useEffect(() => {
    navigate(calculation);
  }, []);
};
