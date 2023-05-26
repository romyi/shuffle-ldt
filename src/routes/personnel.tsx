import { Card, Select, Title } from "@mantine/core";
import { calculation_state } from "@states/calculation";
import { useRecoilState } from "recoil";

export const Personnel = () => {
  const [calculation, setcalculation] = useRecoilState(calculation_state);
  return (
    <Card shadow={"md"} radius="md">
      <Title>Штат</Title>
      <Select
        value={calculation.snapshot?.district}
        onChange={(option) => {
          setcalculation({
            snapshot: { district: option },
          });
        }}
        label="Отрасль"
        data={[{ label: "2", value: "dis" }]}
      />
    </Card>
  );
};
