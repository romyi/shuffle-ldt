import { Container, NumberInput, Stack, Switch } from "@mantine/core";
import { calculation_state } from "@states/calculation";
import { IconInfoCircle } from "@tabler/icons-react";
import { useRecoilState } from "recoil";

export const Stat = () => {
  const [calculation, setcalculation] = useRecoilState(calculation_state);
  return (
    <Container size={"xs"}>
      <IconInfoCircle />
      <Stack mt="md" spacing={"48px"}>
        <Stack spacing={"md"}>
          <NumberInput
            size={"md"}
            required
            value={calculation.snapshot.squareLand || 250}
            onChange={(value) =>
              setcalculation({
                snapshot: {
                  ...calculation.snapshot,
                  squareLand: value === "" ? null : Number(value),
                },
              })
            }
            label="Площадь земельных участков"
            description="от 250 до 25.000 м²"
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
            required
            size={"md"}
            value={calculation.snapshot.squareFacilities || 100}
            onChange={(value) =>
              setcalculation({
                snapshot: {
                  ...calculation.snapshot,
                  squareFacilities: value === "" ? null : Number(value),
                },
              })
            }
            label="Площадь производственных сооружений"
            description="от 100 до 10.000 м²"
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
