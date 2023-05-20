import { Container, Grid, Header, Text, Center } from "@mantine/core";
import Moscow from "/moscow.svg";

export const AppHeader = () => {
  return (
    <Header withBorder={false} height={100}>
      <Container size={"lg"}>
        <Grid p={"sm"} m={0} align="stretch">
          <Grid.Col xs={2} sm={1}>
            <Center mih="100%">
              <img alt="moscow" src={Moscow} />
            </Center>
          </Grid.Col>
          <Grid.Col xs={8} sm={3} md={2}>
            <Text size={11}>
              Департамент инвестиционной и промышленной политики города Москвы
            </Text>
          </Grid.Col>
        </Grid>
      </Container>
    </Header>
  );
};
