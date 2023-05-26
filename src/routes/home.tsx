import { Container, Group, Image, Text, Stack, Title } from "@mantine/core";
import React from "react";

/**
 * Homepage is for:
 *
 * authorization of a registered user
 * product info
 * user experience picking (diving right to the calculator or info check)
 * email fetching from an unauthenticated user
 */

export const Home: React.FC = () => {
  return (
    <Container mt="xl" p="lg" mih={"max-content"}>
      <Stack mih="420px">
        <Title order={3} mb="xl" maw="240px">
          Наша задача - определить стоимость вашего запуска
        </Title>

        {/* <EmailFetch /> */}
        <Group noWrap mt="xl">
          <Image
            sx={{ alignSelf: "center" }}
            miw={120}
            maw={200}
            src="/warehouse-min.jpg"
            alt="warehouse"
          />

          <Text size="sm" maw={320}>
            Приступайте к работе прямо сейчас. Если хотите узнать подробности,
            то Вы сможете найти их ниже.
          </Text>
        </Group>
      </Stack>
    </Container>
  );
};
