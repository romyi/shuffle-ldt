import { SMALL_SCREEN_EXTENT } from "@const";
import { SquareInputsHint } from "@features/user-ux-hints";
import { NumberInput, SimpleGrid, Stack, Switch, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { calculation_state } from "@states/calculation";
import { ui } from "@states/ui";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

export const Stat = () => {
  const small = useMediaQuery(SMALL_SCREEN_EXTENT);
  const [uistate, setuistate] = useRecoilState(ui);
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
  const navigate = useNavigate();

  return (
    <SimpleGrid spacing={"32px"} cols={small ? 1 : 2}>
      <SquareInputsHint
        initialOpen={false}
        link={
          <Text
            sx={{ cursor: "pointer" }}
            underline
            size={"xs"}
            onClick={() => {
              navigate("/question");
              setuistate({ ...uistate, drawer: null });
            }}
          >
            Остались вопросы? Вы можете задать из здесь.
          </Text>
        }
      />
      <Stack mt="xl" spacing={"48px"}>
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
    </SimpleGrid>
  );
};
