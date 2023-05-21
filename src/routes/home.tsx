import { Container, Text, Title } from "@mantine/core";
import React from "react";
import { useRecoilValue } from "recoil";
import { auth_state } from "@states/index";

export const Home: React.FC = () => {
  const auth = useRecoilValue(auth_state);
  return (
    <Container mt="xl">
      {!auth.authorization && (
        <>
          <Title order={4} mt="lg">
            Здравствуйте
          </Title>
          <Text size={"xs"} mt={"md"} maw={"280px"}>
            Рады предложить Вам воспользоваться новым сервисом по рассчету
            стоимости промышленного производства в нашем городе.
          </Text>
        </>
      )}
    </Container>
  );
};
