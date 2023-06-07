import { Badge, SimpleGrid, Stack, Text } from "@mantine/core";
import { calculation_state } from "@states/calculation";
import { useRecoilValue } from "recoil";

export const SquaresDisplayStatus = () => {
  const calculation = useRecoilValue(calculation_state);

  return (
    <SimpleGrid cols={2}>
      <Stack spacing={"0px"}>
        <Text size="sm" color="dimmed">
          Земля
        </Text>{" "}
        <Text>{calculation.snapshot.landSquare} м²</Text>
        {calculation.snapshot.isLandRental && (
          <Badge radius={"sm"} mt="md" ml="-5px" color={"cyan"}>
            Аренда
          </Badge>
        )}
      </Stack>
      <Stack align={"flex-start"} spacing={"0px"}>
        <Text size="sm" color="dimmed">
          Здания
        </Text>{" "}
        <Text>{calculation.snapshot.facilitySquare} м²</Text>
        {calculation.snapshot.isFacilityRental && (
          <Badge radius={"sm"} mt="md" color={"cyan"}>
            Аренда
          </Badge>
        )}
      </Stack>
    </SimpleGrid>
  );
};
