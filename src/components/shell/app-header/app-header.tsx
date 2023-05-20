import { Center, Container, Grid, Header, Text } from "@mantine/core";
import Moscow from "/moscow.svg";

export const AppHeader = () => {
  return (
    <Header withBorder={false} height={100}>
      <Container>
        <Grid p={"md"} m={0}>
          <Grid.Col span={2} xs={2} sm={1}>
            <Center sx={{ height: "100%" }}>
              <img alt="moscow" src={Moscow} />
            </Center>
          </Grid.Col>
          <Grid.Col span={10} xs={10} sm={6}>
            <Text>
              Департамент инвестиционной и промышленной политики города Москвы
            </Text>
          </Grid.Col>
        </Grid>
      </Container>
    </Header>
  );
};
