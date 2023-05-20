import { Alert, rem, Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMantineTheme } from "@mantine/core";
import { generate } from "@pdfme/generator";
import { template, inputs, font } from "@features/generate-report";

export const CoreCarousel = () => {
  const theme = useMantineTheme();
  return (
    <Carousel
      mt={"lg"}
      slideSize="max-content"
      slideGap={"md"}
      align="start"
      withIndicators={true}
      withControls={false}
      height="fit-content"
      breakpoints={[{ maxWidth: "sm", slideSize: "100%" }]}
      styles={{
        indicators: {
          bottom: "-10px",
          justifyContent: "flex-start",
          paddingLeft: "10px",
        },
        indicator: {
          backgroundColor: theme.colors.dark[4],
          width: rem(6),
          // transition: "width 0.3s ease-out",
          "&[data-active]": {
            width: rem(10),
          },
        },
      }}
    >
      <Carousel.Slide p={"8px"} size="30%">
        <Alert maw={"400px"} color={"cyan"} mih="100%" title="Добро пожаловать">
          <Text>
            Очень скоро здесь появятся сервисы для организации промышленного
            производства в Москве. Пока предлагаем Вам осмотреться.
          </Text>
        </Alert>
      </Carousel.Slide>
      <Carousel.Slide p={"8px"} size="60%">
        <Alert
          mih="100%"
          maw={"320px"}
          color={"cyan"}
          sx={() => ({ borderWidth: "0.5px" })}
          variant="outline"
          title="Все самое нужное под рукой"
        >
          <Text>
            Обратите внимание на карусель. С помощью нее можно пройтись по всем
            основным возможностям.
          </Text>
        </Alert>
      </Carousel.Slide>
      <Carousel.Slide p={"8px"}>
        <Alert
          mih="100%"
          maw={"320px"}
          color={"indigo"}
          sx={() => ({ borderWidth: "0.5px", cursor: "pointer" })}
          variant="outline"
          title="Выгрузка отчета на PDF"
          onClick={() =>
            generate({ template, inputs, options: { font } }).then((pdf) => {
              const blob = new Blob([pdf.buffer], { type: "application/pdf" });
              window.open(URL.createObjectURL(blob));
            })
          }
        >
          <Text>
            После того как будет произведет расчет по вашему предприятию, вы
            сможете выгрузить информацию в PDF файл.
          </Text>
          <Text mt="md">
            Нажмите на окно, чтобы в сгенерировать тестовый файл.
          </Text>
        </Alert>
      </Carousel.Slide>
    </Carousel>
  );
};
