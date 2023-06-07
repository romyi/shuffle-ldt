import { Badge, SimpleGrid, Stack, Text } from "@mantine/core";
import { calculation_state } from "@states/calculation";
import { useRecoilValue } from "recoil";

export const LegalsDisplayStatus = () => {
  const calculation = useRecoilValue(calculation_state);

  return (
    <SimpleGrid cols={2}>
      <Stack spacing={"0px"}>
        <Text size="sm" color="dimmed">
          Человек
        </Text>{" "}
        <Text>{calculation.snapshot.personnel}</Text>
      </Stack>
      <Stack align={"flex-start"} spacing={"0px"}>
        <Text size="sm" color="dimmed">
          Техники
        </Text>{" "}
        <Text>{calculation.snapshot.equipment} ед</Text>
      </Stack>
      <Text sx={{ wordBreak: "break-all" }} lineClamp={2} size="xs">
        {calculation.snapshot.branch_display_alias}
      </Text>
      {calculation.snapshot.isIndividual && (
        <Badge radius={"sm"} color="cyan">
          ИП
        </Badge>
      )}
    </SimpleGrid>
  );
};
