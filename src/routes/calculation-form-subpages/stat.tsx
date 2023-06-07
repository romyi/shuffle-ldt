import { SquareInputsHint } from "@features/user-ux-hints";
import { Container, NumberInput, Stack, Switch } from "@mantine/core";
import { calculation_state } from "@states/calculation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const Stat = () => {
  const [calculation, setcalculation] = useRecoilState(calculation_state);
  useEffect(() => {
    setcalculation({
      snapshot: {
        ...calculation.snapshot,
        landSquare: calculation.snapshot.landSquare || 250,
        facilitySquare: calculation.snapshot.facilitySquare || 100,
      },
    });
  }, []);
  return (
    <Container p={0} size={"xs"}>
      <Stack spacing={"48px"}>
        <SquareInputsHint initialOpen={false} />
        <Stack spacing={"md"}>
          <NumberInput
            size={"md"}
            required
            value={calculation.snapshot.landSquare || 250}
            onChange={(value) =>
              setcalculation({
                snapshot: {
                  ...calculation.snapshot,
                  landSquare: value === "" ? null : Number(value),
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
            value={calculation.snapshot.facilitySquare || 100}
            onChange={(value) =>
              setcalculation({
                snapshot: {
                  ...calculation.snapshot,
                  facilitySquare: value === "" ? null : Number(value),
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
            checked={calculation.snapshot.isFacilityRental || false}
            onChange={(event) =>
              setcalculation({
                snapshot: {
                  ...calculation.snapshot,
                  isFacilityRental: event.currentTarget.checked,
                },
              })
            }
          />
        </Stack>
      </Stack>
    </Container>
  );
};
