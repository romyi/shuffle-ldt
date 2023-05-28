import {
  Accordion,
  Button,
  createStyles,
  Group,
  Indicator,
  Stack,
  Text,
} from "@mantine/core";
import { IconPdf } from "@tabler/icons-react";
import { Calculation } from "@tyles/calculation";
import { useNavigate } from "react-router-dom";

const useClasses = createStyles({
  item: {
    backgroundColor: "transparent",
    border: "0.0625rem solid #dee2e6",
  },
});

export const CalculationItemDemo: React.FC<{
  item: Calculation & { from: string; to: string };
}> = ({ item }) => {
  const { classes } = useClasses();
  const navigate = useNavigate();
  return (
    <Accordion
      classNames={{ item: classes.item }}
      value="demo"
      variant="separated"
    >
      <Accordion.Item value="demo">
        <Indicator processing>
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
        </Indicator>
        <Accordion.Panel>
          <Stack>
            <Text>{item.personnel} человек</Text>
            <Text>{item.landSquare} м² участок</Text>
            <Text>{item.facilitySquare} м² строения</Text>
            <Text>{item.branch_display_alias}</Text>
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
    </Accordion>
  );
};
