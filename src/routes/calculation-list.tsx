import { CalculationReportItem } from "@components/report-item";
import { LARGE_SCREEN_EXTENT, SMALL_SCREEN_EXTENT } from "@const";
import {
  useStoragedCalc,
  InvitationToCalculation,
  CalculationItemDemo,
} from "@features/follow-user-onboarding";
import { GeneralModelFeedback } from "@features/gather-user-feedback";
import {
  CalculationsHint,
  InviteProfileHint,
  SnapshotHint,
  SnapshotMechanicHint,
} from "@features/user-ux-hints";
import {
  Accordion,
  Button,
  Container,
  LoadingOverlay,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { keys } from "@network/keystore";
// import { calculation_state } from "@states/calculation";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

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
              <SimpleGrid mt="xl" spacing={"xl"}>
                {!storaged && (
                  <>
                    <InvitationToCalculation />
                    <Text size={"xs"}>
                      В 2021 году Москва экспортировала продукцию в 186 стран
                      мира. Более 30 процентов всего экспорта приходится на
                      Казахстан, Белоруссию, Китай, Индию, Турцию.
                    </Text>
                  </>
                )}
                {storaged && (
                  <>
                    <SnapshotHint />
                    <SnapshotMechanicHint />
                    <CalculationItemDemo item={storaged} />
                    <GeneralModelFeedback />
                  </>
                )}
              </SimpleGrid>
            </>
          ) : (
            <>
              {!small && <Title>Расчёты</Title>}
              <SimpleGrid>
                <CalculationsHint />
                <InviteProfileHint initialOpen={false} />
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
                    // <Stack maw="220px">
                    //   <Text mt="xl" size={"sm"}>
                    //     У вас нет новых расчётов
                    //   </Text>
                    //   <Button
                    //     size={"sm"}
                    //     variant="outline"
                    //     onClick={() => navigate("/calculation")}
                    //   >
                    //     Создать расчёт
                    //   </Button>
                    // </Stack>
                    <Accordion defaultValue={"invitation"}>
                      <Accordion.Item value="invitation">
                        <Accordion.Control>
                          <Text>У вас нет расчётов</Text>
                        </Accordion.Control>
                        <Accordion.Panel>
                          <Button
                            onClick={() => navigate("/calculation")}
                            size={"xs"}
                            variant="outline"
                          >
                            Создать расчёт
                          </Button>
                        </Accordion.Panel>
                      </Accordion.Item>
                    </Accordion>
                  )}
                </Accordion>
                <GeneralModelFeedback />
              </SimpleGrid>
            </>
          )}
        </>
      )}
    </Container>
  );
};
