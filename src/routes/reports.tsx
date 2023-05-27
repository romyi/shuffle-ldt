import { InvitationToCalculation } from "@features/follow-user-onboarding";
import {
  Accordion,
  Alert,
  Button,
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
// import { calculation_state } from "@states/calculation";
import { useUserRegistered } from "@states/ui";
import { IconPdf } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
// import { useRecoilValue } from "recoil";

export const Reports = () => {
  const { isError, isFetching, isFetched } = useQuery(keys.user.me());
  const { isRegistered } = useUserRegistered();
  // const calculation = useRecoilValue(calculation_state);
  const navigate = useNavigate();
  // const doneCalculation = useMutation({
  //   mutationKey: [requestCalculation.key],
  // });
  // const { data } = useQuery({
  //   ...keys.reports.create({
  //     ...calculation.snapshot,
  //     branch: Number(calculation.snapshot.branch),
  //   }),
  //   enabled: false,
  // });
  const doneReport = useMemo(() => {
    const report = localStorage.getItem("report");
    if (report) {
      return JSON.parse(report);
    }
  }, []);
  return (
    <Container sx={{ position: "relative" }}>
      <LoadingOverlay overlayBlur={0.5} opacity={1} visible={isFetching} />
      {isFetched && (
        <>
          {isError ? (
            isRegistered ? (
              <Title>Здравствуйте</Title>
            ) : (
              <Stack>
                <Title>Наша задача - определить стоимость вашего запуска</Title>
              </Stack>
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
          <Alert color={"pink"}>
            <InvitationToCalculation />
          </Alert>
        </SimpleGrid>
        {isError && (
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
              {doneReport ? (
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
                        <Text color={"pink"}>{doneReport.from}</Text>
                        <Text color={"pink"}>{doneReport.to}</Text>
                      </Group>
                      <Accordion.Panel>
                        <Button onClick={() => navigate("/user")}>
                          Подтвердить почту
                        </Button>
                      </Accordion.Panel>
                    </Accordion.Control>
                  </Indicator>
                </Accordion.Item>
              ) : (
                <Accordion.Item value="a">
                  <Accordion.Control>
                    <Group position="apart">
                      <Text>Здесь будут отчеты</Text>
                    </Group>
                  </Accordion.Control>
                </Accordion.Item>
              )}
            </Accordion>
          </SimpleGrid>
        )}
        {!isError && (
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
        )}
      </Stack>
    </Container>
  );
};
