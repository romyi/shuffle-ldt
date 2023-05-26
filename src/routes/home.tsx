import { Container, Group, Image, Text, Stack, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EmailFetch } from "@features/post-email-for-authen";
import { useRecoilState } from "recoil";
import { ui } from "@states/ui_state";

/**
 * Homepage is for:
 *
 * authorization of a registered user
 * product info
 * user experience picking (diving right to the calculator or info check)
 * email fetching from an unauthenticated user
 */

export const Home: React.FC = () => {
  const [uistate, setuistate] = useRecoilState(ui);
  useEffect(() => {
    setuistate({ ...uistate, drawer: null });
  }, []);
  return (
    <Container mt="xl" p="lg" mih={"max-content"}>
      <Stack mih="420px">
        <Title order={3} mb="xl" maw="240px">
          Наша задача - определить стоимость вашего запуска
        </Title>

        <EmailFetch />
        <Group noWrap mt="xl">
          <Image
            sx={{ alignSelf: "center" }}
            miw={120}
            maw={200}
            src="/warehouse-min.jpg"
            alt="warehouse"
          />
          {/* <motion.div
            animate={{ x: [160, 0] }}
            transition={{ duration: 1, ease: "easeInOut" }}
          > */}
          <Text size="sm" maw={320}>
            Подтвердите почту и приступайте к работе. Если хотите узнать
            подробности, то Вы сможете найти их ниже.
          </Text>
          {/* </motion.div> */}
        </Group>
      </Stack>
    </Container>
  );
};
