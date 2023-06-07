import { SMALL_SCREEN_EXTENT } from "@const";
import { StatsInputsHint } from "@features/user-ux-hints";
import { NumberInput, Select, SimpleGrid, Stack, Switch } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { keys } from "@network/keystore";
import { calculation_state } from "@states/calculation";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const Legal = () => {
  const [calculation, setcalculation] = useRecoilState(calculation_state);
  const { data, isFetching } = useQuery(keys.static.industries());
  const small = useMediaQuery(SMALL_SCREEN_EXTENT);

  useEffect(() => {
    setcalculation({
      snapshot: {
        ...calculation.snapshot,
        personnel: calculation.snapshot.personnel || 30,
        equipment: calculation.snapshot.equipment || 30,
      },
    });
  }, []);
  return (
    <SimpleGrid cols={small ? 1 : 2}>
      <StatsInputsHint initialOpen={false} />
      <Stack mt="xl" spacing={"48px"}>
        <Select
          required
          disabled={isFetching}
          searchable
          size={"md"}
          clearable
          description="Выберите из списка"
          value={String(calculation.snapshot.branch)}
          onChange={(value) =>
            setcalculation({
              snapshot: {
                ...calculation.snapshot,
                branch: value,
                branch_display_alias: data?.find(
                  (branch) => branch.id === Number(value)
                )?.name as string,
              },
            })
          }
          label={"Отрасль"}
          placeholder={data ? data[0].name : "Данные загружаются"}
          data={
            data
              ? data
                  .map((display) => ({
                    label: display.name,
                    value: String(display.id),
                  }))
                  .sort((a, b) =>
                    a.label < b.label ? -1 : a.label > b.label ? 1 : 0
                  )
              : []
          }
        />

        <NumberInput
          required
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
          required
          size={"md"}
          value={calculation.snapshot.equipment || 30}
          onChange={(value) =>
            setcalculation({
              snapshot: {
                ...calculation.snapshot,
                equipment: Number(value),
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
          checked={Boolean(calculation.snapshot.isIndividual)}
          onChange={(event) => {
            setcalculation({
              snapshot: {
                ...calculation.snapshot,
                isIndividual: event.currentTarget.checked,
              },
            });
          }}
        />
      </Stack>
    </SimpleGrid>
  );
};
