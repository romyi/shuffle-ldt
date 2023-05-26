import { Card, Select, Title } from "@mantine/core";
import { calculation_state } from "@states/calculation";
import { useRecoilState } from "recoil";

export const FacilitiesInfo = () => {
  const [calculation, setcalculation] = useRecoilState(calculation_state);
  return (
    <Card shadow={"md"} radius="md">
      <Title>Штат</Title>
      <Select
        value={calculation.snapshot.branch}
        onChange={(option) => {
          console.log(option);
          setcalculation({
            snapshot: { ...calculation.snapshot, branch: option },
          });
        }}
        label="Отрасль"
        data={[
          { label: "Пищевая промышленность", value: "Пищевая промышленность" },
        ]}
      />
    </Card>
  );
};
