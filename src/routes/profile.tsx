import {
  Badge,
  Button,
  Card,
  Container,
  Overlay,
  PinInput,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { keys } from "@network/index";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const Profile = () => {
  const { isError } = useQuery(keys.user.me());
  const [mail, setmail] = useState("");
  const [code, setcode] = useState("");

  const [sent, setsent] = useState(false);
  const [sentcode, setsendcode] = useState(false);

  // по сути это мутация
  const { isSuccess } = useQuery({
    ...keys.auth.sendAuthCode(mail),
    enabled: sent,
    onSettled: () => setsent(false),
  });

  const { data } = useQuery({
    ...keys.auth.token({ email: mail, code: code }),
    enabled: sentcode,
    onSettled: () => setsendcode(false),
  });

  return (
    <Container>
      <SimpleGrid>
        {isError && (
          <Stack>
            <TextInput
              onChange={(event) => setmail(event.currentTarget.value)}
              value={mail}
              label="Введите почту"
              placeholder="xxx@yy.tt"
            />
            <Button onClick={() => setsent(true)}>Отправить</Button>
          </Stack>
        )}
        {isSuccess && (
          <Stack>
            <Title>Код</Title>
            <PinInput
              onChange={(value) => setcode(value)}
              size={"xl"}
              length={6}
            />
            <Button onClick={() => setsendcode(true)}>получить токен</Button>
          </Stack>
        )}
      </SimpleGrid>
    </Container>
  );
};
