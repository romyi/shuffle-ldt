import { Container, NumberInput, Select, Stack, Switch } from "@mantine/core";
import { calculation_state } from "@states/calculation";
import { useRecoilState } from "recoil";

export const Legal = () => {
  const [calculation, setcalculation] = useRecoilState(calculation_state);

  return (
    <Container size={"sm"} pt="sm">
      <Stack spacing={"48px"} mt="xl">
        <Select
          searchable
          size={"md"}
          clearable
          description="Выберите из списка"
          value={calculation.snapshot.branch}
          onChange={(value) =>
            setcalculation({
              snapshot: { ...calculation.snapshot, branch: value },
            })
          }
          label={"Отрасль"}
          data={["Рыболовное хоз-во"]}
        />

        <NumberInput
          size={"md"}
          value={calculation.snapshot.personnel || 30}
          onChange={(value) =>
            setcalculation({
              snapshot: { ...calculation.snapshot, personnel: Number(value) },
            })
          }
          label="Количество сотрудников"
          description="от 1 до 5000"
          placeholder="200"
          stepHoldDelay={500}
          stepHoldInterval={100}
          max={5000}
          min={1}
        />
        <NumberInput
          size={"md"}
          value={calculation.snapshot.equipmentUnits || 30}
          onChange={(value) =>
            setcalculation({
              snapshot: {
                ...calculation.snapshot,
                equipmentUnits: Number(value),
              },
            })
          }
          label="Единиц производственного оборудования"
          description="от 1 до 100 шт"
          placeholder="30"
          stepHoldDelay={500}
          stepHoldInterval={100}
          max={100}
          min={1}
        />
        <Switch
          label="Я индивидуальный предприниматель"
          checked={calculation.snapshot.isEnterpreneur || false}
          onChange={(event) =>
            setcalculation({
              snapshot: {
                ...calculation.snapshot,
                isEnterpreneur: event.currentTarget.checked,
              },
            })
          }
        />
      </Stack>
    </Container>
  );
};
