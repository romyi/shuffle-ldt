import {
  Card,
  Container,
  Stack,
  Text,
  Title,
  useMantineTheme,
  rem,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useNavigate } from "react-router-dom";
import { external_config } from "../../../routes";
import { useState, useEffect } from "react";

export const CoreCarousel = () => {
  const theme = useMantineTheme();
  const [activeSlide, setActiveSlide] = useState(1);
  const navigate = useNavigate();
  const changeRoute = (slide: number) => {
    if (external_config[slide]) {
      setActiveSlide(slide + 1);
      navigate(`/${external_config[slide].path}`);
    }
  };

  return (
    <Container>
      <Carousel
        initialSlide={Number(sessionStorage.getItem("slide")) - 1 || 0}
        onSlideChange={changeRoute}
        mt={"sm"}
        slideSize="max-content"
        slideGap={"md"}
        // align="start"
        withIndicators={true}
        withControls={false}
        height="fit-content"
        breakpoints={[{ maxWidth: "sm", slideSize: "100px" }]}
        styles={{
          indicators: {
            bottom: "-50px",
            justifyContent: "center",
            paddingLeft: "10px",
          },
          container: {
            [`& > div:not(:nth-of-type(${activeSlide}))`]: {
              opacity: "0.6",
            },
          },
          indicator: {
            backgroundColor: theme.colors.dark[4],
            width: rem(5),
            // transition: "width 0.3s ease-out",
            "&[data-active]": {
              width: rem(8),
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
              Настройки
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
