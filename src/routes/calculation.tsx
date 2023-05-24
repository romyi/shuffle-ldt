import DeckGL from "@deck.gl/react/typed";
import { GeoJsonLayer, TextLayer } from "@deck.gl/layers/typed";
import districts from "../assets/districts_geo.json";
import { useState } from "react";
import { Button, Container, Stack, Text, Title } from "@mantine/core";

const texts = [
  {
    text: "САО",
    position: [37.517, 55.8566],
  },
  {
    text: "СВАО",
    position: [37.6317, 55.85769],
  },
  {
    text: "ЦАО",
    position: [37.625, 55.763],
  },
  {
    text: "ВАО",
    position: [37.7951, 55.79023],
  },
  {
    text: "ЮВАО",
    position: [37.7822, 55.6794],
  },
  {
    text: "ЮАО",
    position: [37.64267, 55.621],
  },
  {
    text: "ЗАО",
    position: [37.489, 55.7152],
  },
  {
    text: "СЗАО",
    position: [37.44, 55.8],
  },
  {
    text: "ЮЗАО",
    positon: [37.7146, 55.6563],
  },
  {
    text: "ЗелАО",
    position: [37.08426, 55.98],
    color: [0, 0, 0],
  },
  {
    text: "Новомосковский",
    position: [37.392, 55.574],
  },
  {
    text: "Троицкий",
    position: [37.18, 55.324],
  },
];

export const Calculation = () => {
  const [region, setRegion] = useState<string>("");

  return (
    <>
      <DeckGL
        width={"100%"}
        height={"100%"}
        controller={true}
        viewState={{
          longitude: 37.418,
          latitude: 55.6212,
          zoom: 7.7,
        }}
        layers={[
          new GeoJsonLayer({
            id: "districts",
            data: districts,
            filled: true,
            updateTriggers: {
              getFillColor: { region },
            },
            transitions: {
              getFillColor: { duration: 300 },
            },
            getFillColor: (f: { properties: any }) => {
              return f.properties.ABBREV_AO === region
                ? [214, 51, 108, 225] // pink
                : // ?  [59, 201, 219, 225] // cyan
                  [26, 27, 30, 220];
            },
            pickable: true,
            onClick: (info) => setRegion(info.object.properties.ABBREV_AO),
          }),
          new TextLayer({
            id: "titles",
            data: texts,
            getText: (d) => {
              return d.text;
            },
            getPosition: (d) => d.position,
            getColor: (d) => d.color || [255, 255, 255, 255],
            getSize: 10,
            piackable: true,
            getAngle: 0,
            characterSet: new Set([
              "А",
              "О",
              "С",
              "В",
              "Ц",
              "Ю",
              "З",
              "е",
              "л",
              "Н",
              "Т",
              ..."Новомосковский".split(""),
              ..."Троицкий".split(""),
            ]),
          }),
        ]}
      />
      <Container size={"xs"} h="85%" pr="xl" pl="xl">
        <Stack align={"flex-end"} h="100%" justify={"space-between"}>
          <Title order={4}>Шаг 1: Выберите округ</Title>
          <Stack align={"flex-end"}>
            <Text size={"xl"} fw={800}>
              {region}
            </Text>
            <Button disabled={!region} maw={80}>
              Далее
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};
