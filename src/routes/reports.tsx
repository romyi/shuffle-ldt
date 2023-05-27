import {
  Accordion,
  Alert,
  Button,
  Card,
  Container,
  Group,
  Indicator,
  LoadingOverlay,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { keys } from "@network/keystore";
import { ui } from "@states/ui_state";
import { IconPdf } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

export const Reports = () => {
  const { isError, isFetching, isFetched } = useQuery(keys.user.me());
  const uistate = useRecoilValue(ui);
  return (
    <Container sx={{ position: "relative" }}>
      <LoadingOverlay overlayBlur={0.5} opacity={1} visible={isFetching} />
      {isFetched && (
        <>
          {isError ? (
            uistate.visited ? (
              <Title>Здравствуйте</Title>
            ) : (
              <Title>Наша задача - определить стоимость вашего запуска</Title>
            )
          ) : (
            <Title>Расчёты</Title>
          )}
        </>
      )}
      <Stack>
        <SimpleGrid>
          <Alert color={"cyan"}>
            <Text>
              Заполните данные ФИО, ИНН чтобы просматривать все отчеты
            </Text>
          </Alert>
        </SimpleGrid>
        <SimpleGrid>
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
                <Button
                  size={"xs"}
                  color="cyan"
                  variant={"light"}
                  leftIcon={<IconPdf />}
                >
                  Скачать
                </Button>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </SimpleGrid>
      </Stack>
    </Container>
  );
};
