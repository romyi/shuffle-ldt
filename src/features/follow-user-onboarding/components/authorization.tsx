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
import { useStoragedCalc } from "../utils";

export const Authorization = () => {
  const client = useQueryClient();
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
  const { isFetching: tokenPending } = useQuery({
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
    },
  });
  return (
    <SimpleGrid>
      <Alert color={"cyan"}>
        Мы отправим 6-ти значный код на указанный адрес.
        {hasTokenAsked && "Введите его в поле ниже"}
      </Alert>
      <LoadingOverlay visible={mailPending || tokenPending} />
      <Card>
        <Stack>
          <TextInput
            onChange={(event) => setmail(event.currentTarget.value)}
            value={mail}
            placeholder="промышленность@internet.ru"
          />
          <Button variant={"outline"} onClick={() => setHasAuthCodeAsked(true)}>
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
    </SimpleGrid>
  );
};
