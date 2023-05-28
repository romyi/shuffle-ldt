import { CalculationReportItem } from "@components/report-item";
import {
  useStoragedCalc,
  InvitationToCalculation,
  CalculationItemDemo,
} from "@features/follow-user-onboarding";
import {
  Accordion,
  Button,
  Container,
  LoadingOverlay,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { keys } from "@network/keystore";
// import { calculation_state } from "@states/calculation";
import { useQuery } from "@tanstack/react-query";

//
// Экран расчетов, здесь грязновато
//
export const Reports = () => {
  const { isError, isFetching, isFetched } = useQuery(keys.user.me());
  const { data: reports } = useQuery(keys.reports.list());
  const storaged = useStoragedCalc();
  return (
    <Container>
      <LoadingOverlay overlayBlur={0.5} opacity={1} visible={isFetching} />
      {isFetched && (
        <>
          {/** unaithorized user */}
          {isError ? (
            <>
              <SimpleGrid mt="xl">
                {!storaged && (
                  <Title>
                    Наша задача - определить стоимость вашего запуска
                  </Title>
                )}
                {storaged ? (
                  <Stack>
                    <Text color={"dimmed"}>Ваш последний расчёт</Text>
                    <CalculationItemDemo item={storaged} />
                  </Stack>
                ) : (
                  <InvitationToCalculation />
                )}
              </SimpleGrid>
            </>
          ) : (
            <>
              <Title>Расчёты</Title>
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
                  {reports &&
                    reports.map((reportItem) => (
                      <CalculationReportItem item={reportItem} />
                    ))}
                  {(!reports || reports.length === 0) && (
                    <Stack>
                      <Text size={"sm"}>У вас нет новых расчётов</Text>
                      <Button size={"sm"} variant="outline">
                        Создать расчёт
                      </Button>
                    </Stack>
                  )}
                </Accordion>
              </SimpleGrid>
            </>
          )}
        </>
      )}
    </Container>
  );
};
