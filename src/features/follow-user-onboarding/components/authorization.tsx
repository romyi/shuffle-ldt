import { UxFeedback } from "@features/gather-user-feedback/ux-feedback";
import {
  Alert,
  Button,
  Card,
  LoadingOverlay,
  PinInput,
  SimpleGrid,
  Stack,
  TextInput,
} from "@mantine/core";
import { keys, requestCalculation } from "@network/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoragedCalc } from "../utils";

export const Authorization = () => {
  const client = useQueryClient();
  const navigate = useNavigate();
  const [mail, setmail] = useState("");
  const [code, setcode] = useState("");

  const [hasAuthCodeAsked, setHasAuthCodeAsked] = useState(false);
  const [hasTokenAsked, setHasTokenAsked] = useState(false);

  // надо подумать что лучше использовать: квери или мутацию
  const {
    isSuccess: isEmailCodeSent,
    isError,
    isFetching: mailPending,
  } = useQuery({
    ...keys.auth.askEmailCode(mail),
    enabled: hasAuthCodeAsked,
    onSettled: () => setHasAuthCodeAsked(false),
  });
  const calculateStashed = useMutation(requestCalculation, {
    onSuccess: () =>
      client.invalidateQueries({ queryKey: keys.reports.list().queryKey }),
  });
  const stashed = useStoragedCalc();
  const { isFetching: tokenPending, isError: errorWhileTokenFecth } = useQuery({
    ...keys.auth.token({ email: mail, code: code }),
    enabled: hasTokenAsked,
    onSettled: () => {
      setHasTokenAsked(false);
      // calculate stashed entity again as a authorized user
      if (stashed)
        calculateStashed.mutate(stashed, {
          onSettled: () =>
            client.invalidateQueries({
              queryKey: keys.reports.list().queryKey,
            }),
        });
      client.invalidateQueries({ queryKey: keys.user.me().queryKey });
      navigate("/");
    },
  });
  return (
    <>
      <SimpleGrid>
        {/* <Alert h={"120px"} color={"cyan"}>
          Мы отправим 6-ти значный код на указанный адрес.
          {hasTokenAsked && "Введите его в поле ниже"}
        </Alert> */}
        <LoadingOverlay visible={mailPending || tokenPending} />
        <Card>
          <Stack>
            <TextInput
              onChange={(event) => setmail(event.currentTarget.value)}
              value={mail}
              placeholder="промышленность@internet.ru"
            />
            <Button
              variant={"outline"}
              onClick={() => setHasAuthCodeAsked(true)}
            >
              Получить код авторизации
            </Button>
          </Stack>
        </Card>
        {isEmailCodeSent && (
          <Card>
            <Stack>
              <PinInput
                onChange={(value) => setcode(value)}
                size={"sm"}
                length={6}
              />
              <Button onClick={() => setHasTokenAsked(true)}>Войти</Button>
            </Stack>
          </Card>
        )}
        {isError && (
          <Alert color={"yellow"}>Пожалуйста, введите корректный адрес</Alert>
        )}
        {errorWhileTokenFecth && (
          <Alert color={"yellow"}>
            Код некорректен, пожалуйста, запросите ноый
          </Alert>
        )}
        <UxFeedback />
      </SimpleGrid>
    </>
  );
};
