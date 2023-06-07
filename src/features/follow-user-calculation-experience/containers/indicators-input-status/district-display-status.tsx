import { SimpleGrid, Stack, Text } from "@mantine/core";
import { calculation_state } from "@states/calculation";
import { IconFlag2Filled } from "@tabler/icons-react";
import { useRecoilValue } from "recoil";

export const DistrictDisplatStatus = () => {
  const calculation = useRecoilValue(calculation_state);
  return (
    <SimpleGrid cols={1}>
      <Stack spacing={"0px"}>
        <Text color="dimmed" size="sm">
          Выбранный округ
        </Text>
        <Text mb="12px">{calculation.snapshot.district_display_alias}</Text>
      </Stack>
      <IconFlag2Filled />
    </SimpleGrid>
  );
};
