import { Header, Image, Text, Container, Group, Stack } from "@mantine/core";
import Moscow from "/moscow.svg";

export const MobileHeader = () => {
  return (
    <Header withBorder={false} height={120}>
      <Container pr="xl" pl="xl" size={"xs"}>
        <Group mt={"lg"} noWrap spacing="63px" position="apart" align="top">
          <Stack spacing={"4px"}>
            <Group spacing={10}>
              <Text fw={800} size={"lg"}>
                Индустрия
              </Text>
              <Text
                fw={800}
                variant={"gradient"}
                gradient={{ from: "grape", to: "red", deg: 20 }}
                size="lg"
              >
                Москва
              </Text>
            </Group>
            <Text color={"#DCE0E7"} maw="240px" size="xs">
              Департамент инвестиционной и промышленной политики Москвы
            </Text>
          </Stack>
          <Image width={28} src={Moscow} />
        </Group>
      </Container>
    </Header>
  );
};
