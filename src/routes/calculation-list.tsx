import { CalculationReportItem } from "@components/report-item";
import {
  useStoragedCalc,
  InvitationToCalculation,
  CalculationItemDemo,
} from "@features/follow-user-onboarding";
import { GeneralModelFeedback } from "@features/gather-user-feedback";
import { CalculationsHint } from "@features/user-ux-hints";
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
import { useMediaQuery } from "@mantine/hooks";
import { keys } from "@network/keystore";
// import { calculation_state } from "@states/calculation";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LARGE_SCREEN_EXTENT, SMALL_SCREEN_EXTENT } from "../consts";

//
// Экран расчетов, здесь грязновато
//
export const Reports = () => {
  const navigate = useNavigate();
  const [, setparam] = useSearchParams();
  const { isError, isFetching, isFetched } = useQuery(keys.user.me());
  const { data: reports } = useQuery(keys.reports.list());
  const storaged = useStoragedCalc();
  const large = useMediaQuery(LARGE_SCREEN_EXTENT);
  const small = useMediaQuery(SMALL_SCREEN_EXTENT);
  return (
    <Container p={small ? "0px" : "sm"}>
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
              {!small && <Title>Расчёты</Title>}
              <SimpleGrid>
                <CalculationsHint />
                <GeneralModelFeedback />
                <Accordion
                  onChange={(item) => setparam({ id: item as string })}
                  sx={{ gridColumn: large ? "1/3" : "1/2" }}
                  styles={{
                    item: {
                      backgroundColor: "transparent",
                      border: "0.0625rem solid #dee2e6",
                    },
                  }}
                  variant="separated"
                >
                  {reports &&
                    [...reports]
                      .reverse()
                      .map((reportItem) => (
                        <CalculationReportItem
                          key={reportItem.id}
                          item={reportItem}
                        />
                      ))}
                  {(!reports || reports.length === 0) && (
                    <Stack>
                      <Text size={"sm"}>У вас нет новых расчётов</Text>
                      <Button
                        size={"sm"}
                        variant="outline"
                        onClick={() => navigate("/calculation")}
                      >
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
