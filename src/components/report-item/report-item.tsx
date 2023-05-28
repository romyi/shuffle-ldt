import { Accordion, Button, Group, Stack, Text } from "@mantine/core";
import { IconPdf } from "@tabler/icons-react";
import { Calculation } from "@tyles/calculation";
import { useNavigate } from "react-router-dom";

export const CalculationReportItem: React.FC<{
  item: { from: string; to: string; id: string; request: Calculation };
}> = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Accordion.Item value={item.id}>
      <Accordion.Control>
        <Group position="apart">
          <Text size={"xs"}>Прогнозируемая стоимость</Text>
          <Group>
            <Text size={"xs"}>мин.</Text>
            <Text color={"pink"} fw={800}>
              {Number(item?.from).toFixed(2)} тыс
            </Text>
          </Group>
          <Group>
            <Text size={"xs"}>макc.</Text>
            <Text color={"pink"} fw={800}>
              {Number(item?.to).toFixed(2)} тыс
            </Text>
          </Group>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack>
          <Text>{item?.request?.personnel} человек</Text>
          <Text>{item?.request?.landSquare} м² участок</Text>
          <Text>{item?.request?.facilitySquare} м² строения</Text>
          <Button
            mt="xl"
            size={"xs"}
            color="cyan"
            variant={"light"}
            leftIcon={<IconPdf />}
            onClick={() => navigate("/user")}
          >
            Составить и загрузить подробный отчёт
          </Button>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};
