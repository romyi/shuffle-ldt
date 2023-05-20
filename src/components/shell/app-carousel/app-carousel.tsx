import { Alert, Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconNotification } from "@tabler/icons-react";

export const CoreCarousel = () => {
  return (
    <Carousel
      mt={"lg"}
      slideSize="max-content"
      slideGap={"md"}
      align="start"
      withIndicators={true}
      withControls={false}
      height="fit-content"
      breakpoints={[{ maxWidth: "xs", slideSize: "100%" }]}
    >
      <Carousel.Slide p={"8px"}>
        <Alert
          maw={"400px"}
          color={"cyan"}
          title="Добро пожаловать"
          icon={<IconNotification />}
        >
          <Text>
            Очень скоро здесь появятся сервисы для организации промышленного
            производства в Москве. Пока предлагаем Вам осмотреться. Очень скоро
            здесь появятся сервисы для организации промышленного производства в
            Москве. Пока предлагаем Вам осмотреться.
          </Text>
        </Alert>
      </Carousel.Slide>
      <Carousel.Slide p={"8px"}>
        <Alert
          maw={"320px"}
          color={"cyan"}
          sx={() => ({ borderWidth: "0.5px" })}
          variant="outline"
          title="Все самое нужное под рукой"
          icon={<IconNotification />}
        >
          <Text>
            Обратите внимание на карусель ниже. С помощью нее можно пройтись по
            всем основным возможностям.
          </Text>
        </Alert>
      </Carousel.Slide>
    </Carousel>
  );
};
