import { Calculation } from "@tyles/calculation";
import { useCallback, useEffect, useState } from "react";
import { emitSessionMessage } from "./session-storage-event";

export const useOngoingCalculation = () => {
  const [calculation, setcalculation] = useState<Partial<Calculation> | null>(
    null
  );
  const handleSessionStorageUpdate = useCallback((event: any) => {
    console.log(event);
    console.log(event.detail);
    setcalculation(event.detail);
  }, []);
  const update = useCallback((data: Partial<Calculation>) => {
    emitSessionMessage(data);
  }, []);
  useEffect(() => {
    // if (!calculation) {
    const calculation = sessionStorage.getItem("calculation");
    if (calculation) setcalculation(JSON.parse(calculation));
    // }
    window.addEventListener("sessionStorage", handleSessionStorageUpdate);
    return () => {
      window.addEventListener("sessionStorage", handleSessionStorageUpdate);
    };
  }, []);
  return { calculation, update };
};
