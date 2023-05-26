import { Container, NumberInput, Stack, Switch } from "@mantine/core";
import { calculation_state } from "@states/calculation";
import { useRecoilState } from "recoil";

export const Stat = () => {
  const [calculation, setcalculation] = useRecoilState(calculation_state);
  return (
    <Container size={"sm"} pt="sm">
      <Stack spacing={"48px"} mt="xl">
        <Stack spacing={"md"}>
          <NumberInput
            size={"md"}
            value={calculation.snapshot.squareLand || 100}
            onChange={(value) =>
              setcalculation({
                snapshot: {
                  ...calculation.snapshot,
                  squareLand: Number(value),
                },
              })
            }
            label="Площадь земельных участков"
            description="от 250 до 25.000 кв.м"
            placeholder="1000"
            stepHoldDelay={500}
            stepHoldInterval={100}
            max={25000}
            step={250}
            min={250}
          />
          <Switch
            label="Есть арендованные участки"
            checked={calculation.snapshot.isLandRental || false}
            onChange={(event) =>
              setcalculation({
                snapshot: {
                  ...calculation.snapshot,
                  isLandRental: event.currentTarget.checked,
                },
              })
            }
          />
        </Stack>
        <Stack spacing={"md"}>
          <NumberInput
            size={"md"}
            value={calculation.snapshot.squareFacilities || 100}
            onChange={(value) =>
              setcalculation({
                snapshot: {
                  ...calculation.snapshot,
                  squareFacilities: Number(value),
                },
              })
            }
            label="Площадь производственных сооружений"
            description="от 100 до 10.000 кв.м"
            placeholder="1000"
            stepHoldDelay={500}
            stepHoldInterval={100}
            max={10000}
            step={100}
            min={100}
          />
          <Switch
            label="Есть арендованные здания"
            checked={calculation.snapshot.isFacilitiesRental || false}
            onChange={(event) =>
              setcalculation({
                snapshot: {
                  ...calculation.snapshot,
                  isFacilitiesRental: event.currentTarget.checked,
                },
              })
            }
          />
        </Stack>
      </Stack>
    </Container>
  );
};
