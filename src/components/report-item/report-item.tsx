import { Accordion, Button, Group, Stack, Text } from "@mantine/core";
import { keys } from "@network/index";
import { IconPdf } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { Calculation } from "@tyles/calculation";

const prettify = (input: number) => {
  return input / 1000;
};

export const CalculationReportItem: React.FC<{
  item: { from: string; to: string; id: string; request: Calculation };
}> = ({ item }) => {
  const { refetch } = useQuery({
    ...keys.reports.pdf({ id: item.id }),
    enabled: false,
  });
  const handleClick = () =>
    refetch().then((data) => {
      window.open(data.data.link, "_blank");
      data.data.revoke();
    });
  return (
    <Accordion.Item value={item.id}>
      <Accordion.Control>
        <Group position="apart">
          <Text size={"xs"}>Прогнозируемая стоимость</Text>
          <Group>
            <Text size={"xs"}>мин.</Text>
            <Text fw={800}>
              {prettify(Number(item?.from)).toFixed(1)} млн. рублей
            </Text>
          </Group>
          <Group>
            <Text size={"xs"}>макc.</Text>
            <Text color={"cyan"} fw={800}>
              {prettify(Number(item?.to)).toFixed(1)} млн. рублей
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
            onClick={handleClick}
          >
            Составить и загрузить подробный отчёт
          </Button>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};
