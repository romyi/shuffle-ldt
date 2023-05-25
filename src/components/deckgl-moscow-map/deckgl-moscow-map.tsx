import DeckGL from "@deck.gl/react/typed";
import { GeoJsonLayer, TextLayer } from "@deck.gl/layers/typed";
import districts from "../../assets/districts_geo.json";
import { text_titles } from "./constants";
import { useMediaQuery } from "@mantine/hooks";
import { useMemo } from "react";

export const MoscowMap: React.FC<{
  onClickCallback: (info: any) => void;
  regionTitle: string;
}> = ({ onClickCallback, regionTitle }) => {
  const xs = useMediaQuery("(max-height: 700px)");
  const s = useMediaQuery("(max-height: 860px)");
  const md = useMediaQuery("(max-height: 1080px)");
  const offset = useMediaQuery("(min-width: 1080px)");
  const zoom = useMemo(() => {
    if (xs) return 7.6;
    if (s) return 8;
    if (md) return 8.4;
    return 9.4;
  }, [xs, s, md]);
  return (
    <DeckGL
      viewState={{
        longitude: offset ? 36.51 : 37.418,
        latitude: 55.7012,
        zoom: zoom,
      }}
      layers={[
        new GeoJsonLayer({
          id: "districts",
          data: districts,
          filled: true,
          updateTriggers: {
            getFillColor: { regionTitle },
          },
          transitions: {
            getFillColor: { duration: 300 },
          },
          getFillColor: (f: { properties: any }) => {
            return f.properties.ABBREV_AO === regionTitle
              ? [214, 51, 108, 225] // pink
              : // ?  [59, 201, 219, 225] // cyan
                [26, 27, 30, 220];
          },
          pickable: true,
          onClick: (info) => {
            onClickCallback(info);
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
