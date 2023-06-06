import { Accordion, Group, Stack, Text } from "@mantine/core";
import { Calculation } from "@tyles/calculation";
import { ControlContent, ItemActions } from "./report-item-blocks";

export const CalculationReportItem: React.FC<{
  item: {
    from: string;
    to: string;
    id: string;
    request: Calculation;
    date: string;
  };
}> = ({ item }) => {
  return (
    <Accordion.Item value={item.id} sx={{ position: "relative" }}>
      <ControlContent item={item} />
      <Accordion.Panel>
        <Group m="4px" fz={"xs"} spacing={"xl"}>
          <Stack spacing={0}>
            <Text>{item?.request?.personnel}</Text>
            <Text color="dimmed">человек</Text>
          </Stack>
          <Stack spacing={0}>
            <Text>{item?.request?.landSquare} м²</Text>
            <Text color="dimmed">участок</Text>
          </Stack>
          <Stack spacing={0}>
            <Text>{item?.request?.facilitySquare} м²</Text>
            <Text color="dimmed"> постройки</Text>
          </Stack>
        </Group>
        <ItemActions item={item} />
      </Accordion.Panel>
    </Accordion.Item>
  );
};
