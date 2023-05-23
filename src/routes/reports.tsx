import {
  Accordion,
  Button,
  Container,
  Group,
  Indicator,
  Stack,
  Text,
} from "@mantine/core";
import { IconPdf } from "@tabler/icons-react";

export const Reports = () => {
  return (
    <Container mih="400px" size={"xl"}>
      <Accordion
        styles={{
          item: {
            backgroundColor: "transparent",
            border: "0.0625rem solid #dee2e6",
          },
        }}
        variant="separated"
      >
        <Accordion.Item value="a">
          <Indicator>
            <Accordion.Control>
              <Group position="apart">
                <Stack spacing={"xs"}>
                  <Text size={"xs"} color="dimmed">
                    22.06.2023
                  </Text>
                  <Text>ООО Микрон</Text>
                </Stack>
                <Text color={"pink"}>2.9 млн</Text>
              </Group>
            </Accordion.Control>
          </Indicator>
          <Accordion.Panel>
            <Button size={"xs"} variant={"light"} leftIcon={<IconPdf />}>
              Скачать
            </Button>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="b">
          <Accordion.Control>
            <Group position="apart">
              <Stack spacing={"xs"}>
                <Text size={"xs"} color="dimmed">
                  10.06.2023
                </Text>
                <Text>ИП Руслан</Text>
              </Stack>
              <Text color={"pink"}>0.9 млн</Text>
            </Group>
          </Accordion.Control>
          <Accordion.Panel>
            <Button size={"xs"} variant={"light"} leftIcon={<IconPdf />}>
              Скачать
            </Button>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};
