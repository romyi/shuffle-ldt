import {
  Header,
  Image,
  Text,
  Container,
  Group,
  Stack,
  createStyles,
} from "@mantine/core";
import Moscow from "/moscow.svg";

const headerClasses = createStyles({
  root: {
    background:
      "linear-gradient(180deg, #FFFFFF 40.16%, rgba(255, 255, 255, 0) 666.39%);",
  },
});

export const MobileHeader = () => {
  const { classes } = headerClasses();
  return (
    <Header classNames={{ root: classes.root }} withBorder={false} height={120}>
      <Container pr="xl" pl="xl" size={"xs"}>
        <Group mt={"lg"} noWrap spacing="63px" position="apart" align="top">
          <Stack spacing={"0px"}>
            <Group spacing={6}>
              <Text fw={800} size={"lg"}>
                Моё
              </Text>
              <Text
                fw={800}
                variant={"gradient"}
                gradient={{ from: "grape", to: "red", deg: 20 }}
                size="lg"
              >
                Предприятие
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
