import DeckGL from "@deck.gl/react/typed";
import { GeoJsonLayer, TextLayer } from "@deck.gl/layers/typed";
import districts from "../../assets/districts_geo.json";
import { text_titles } from "./constants";
import { useMediaQuery } from "@mantine/hooks";
import { useMemo } from "react";
import { useRecoilState } from "recoil";
import { calculation_state } from "@states/calculation";

const filter_districts = (
  districts_geojson: typeof districts
): typeof districts => {
  const filtered_features = districts_geojson.features.filter(
    (feature) =>
      feature.properties.NAME_AO !== "Новомосковский" &&
      feature.properties.NAME_AO !== "Троицкий"
  );
  return { type: districts_geojson.type, features: filtered_features };
};

const target_districts = filter_districts(districts);

export const MoscowMap = () => {
  const [calculation, setcalculation] = useRecoilState(calculation_state);
  const md = useMediaQuery("(max-height: 1080px)");
  const zoom = useMemo(() => {
    if (md) return 8.5;
    return 9;
  }, [md]);
  return (
    <DeckGL
      viewState={{
        longitude: 37.558,
        latitude: 55.6312,
        zoom: zoom,
      }}
      layers={[
        new GeoJsonLayer({
          id: "districts",
          data: target_districts,
          filled: true,
          updateTriggers: {
            getFillColor: { calculation },
          },
          transitions: {
            getFillColor: { duration: 300 },
          },
          getFillColor: (f: { properties: any }) => {
            return f.properties.ABBREV_AO === calculation?.snapshot.district
              ? [214, 51, 108, 225] // pink
              : // ?  [59, 201, 219, 225] // cyan
                [26, 27, 30, 220];
          },
          pickable: true,
          onClick: (info) => {
            setcalculation({
              snapshot: {
                ...calculation.snapshot,
                district_display_alias: info.object.properties.NAME_AO,
                district: info.object.properties.ABBREV_AO,
              },
            });
            // update({ district_display_alias: info.object.properties.NAME_AO });
            // update({ district: info.object.properties.ABBREV_AO });
          },
        }),
        new TextLayer({
          id: "titles",
          data: text_titles,
          getText: (d) => {
            return d.text;
          },
          getPosition: (d) => d.position,
          getColor: (d) => d.color || [255, 255, 255, 255],
          getSize: 10,
          piackable: true,
          getAngle: 0,
          characterSet: new Set([
            ..."ЦАЯНСВЮЗНВОТШеф взъярён тчк щипцы с эхом гудбай Жюль".split(""),
          ]),
        }),
      ]}
    />
  );
};
