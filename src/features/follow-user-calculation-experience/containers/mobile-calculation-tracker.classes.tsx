import { createStyles } from "@mantine/core";

export const useClasses = createStyles(() => ({
  overlay: {
    transitionDuration: "0.5s !important",
  },
  inner: {
    padding: "0px",
  },
  root: {
    background: "transparent",
  },
  content: {
    height: "240px",
    background: "transparent",
    transitionDuration: "0.5s !important",
  },
  body: {
    padding: "0px",
    width: "fit-content",
  },
}));
