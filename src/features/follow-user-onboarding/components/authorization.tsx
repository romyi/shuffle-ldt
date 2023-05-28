import {
  Accordion,
  Button,
  LoadingOverlay,
  PinInput,
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
  const { isSuccess: isEmailCodeSent, isFetching: mailPending } = useQuery({
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
    <Accordion
      sx={{ maxWidth: "400px", margin: "32px auto" }}
      value={isEmailCodeSent ? "code" : "mail"}
    >
      <LoadingOverlay visible={mailPending || tokenPending} />
      <Accordion.Item value="mail">
        <Accordion.Control>Введите e-mail:</Accordion.Control>
        <Accordion.Panel>
          <Stack>
            <TextInput
              onChange={(event) => setmail(event.currentTarget.value)}
              value={mail}
              placeholder="промышленность@internet.ru"
            />
            <Button onClick={() => setHasAuthCodeAsked(true)}>Отправить</Button>
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="code">
        <Accordion.Control>Полученный код:</Accordion.Control>
        <Accordion.Panel>
          <Stack>
            <PinInput
              onChange={(value) => setcode(value)}
              size={"xl"}
              length={6}
            />
            <Button onClick={() => setHasTokenAsked(true)}>Войти</Button>
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
