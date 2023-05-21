import { Card, Container, rem, Stack, Text, Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMantineTheme } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const CoreCarousel = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  return (
    <Container>
      <Carousel
        onSlideChange={(i) => (i === 1 ? navigate("/profile") : {})}
        mt={"sm"}
        slideSize="max-content"
        slideGap={"md"}
        align="start"
        withIndicators={true}
        withControls={false}
        height="fit-content"
        breakpoints={[{ maxWidth: "sm", slideSize: "100px" }]}
        styles={{
          indicators: {
            bottom: "-30px",
            justifyContent: "flex-start",
            paddingLeft: "10px",
          },
          indicator: {
            backgroundColor: theme.colors.dark[4],
            width: rem(10),
            // transition: "width 0.3s ease-out",
            "&[data-active]": {
              width: rem(20),
            },
          },
        }}
      >
        <Carousel.Slide p={"8px"}>
          <Card>
            <Card.Section>
              <Title order={4}>Главная</Title>
            </Card.Section>
            <Card.Section>
              <Stack>
                <Text size={"xs"} color="dimmed">
                  Добро пожаловать
                </Text>
              </Stack>
            </Card.Section>
          </Card>
        </Carousel.Slide>
        <Carousel.Slide p={"8px"}>
          <Card p="0px">
            <Title order={4}>Профиль</Title>
            <Text size={"xs"} color="dimmed">
              Добро пожаловать
            </Text>
          </Card>
        </Carousel.Slide>
        <Carousel.Slide p={"8px"}>
          <Card p="0px">
            <Title order={4}>Настройки</Title>
            <Text size={"xs"} color="dimmed">
              change info
            </Text>
            <Text size={"xs"} color="dimmed">
              logout
            </Text>
          </Card>
        </Carousel.Slide>
      </Carousel>
    </Container>
  );
};
