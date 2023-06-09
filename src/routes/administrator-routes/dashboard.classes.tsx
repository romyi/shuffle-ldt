import { LARGE_SCREEN_EXTENT, SMALL_SCREEN_EXTENT } from "@const";
import { useMediaQuery } from "@mantine/hooks";

export const useStyles = () => {
  const large = useMediaQuery(LARGE_SCREEN_EXTENT);
  const small = useMediaQuery(SMALL_SCREEN_EXTENT);
  const panel_defaults = { height: "240px" };
  const listing = large
    ? { gridRowStart: 1, gridColumnEnd: 3, gridColumnStart: 1 }
    : small
    ? { gridColumnEnd: 2 }
    : { gridRowStart: 1 };
  const panel = {
    ...panel_defaults,
    ...(!small && !large ? { gridColumnStart: 2 } : {}),
  };

  return { listing, panel };
};
