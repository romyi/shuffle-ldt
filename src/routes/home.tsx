import { Container, Image, Text } from "@mantine/core";
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
    <Container>
      <Text>Наша задача - определить стоимость вашего запуска</Text>

      <Image
        sx={{ alignSelf: "center" }}
        miw={120}
        maw={200}
        src="/warehouse-min.jpg"
        alt="warehouse"
      />

      {/* <EmailFetch /> */}
    </Container>
  );
};
