import { createStyles } from "@mantine/core";

export const useClasses = createStyles(() => ({
  overlay: {
    transitionDuration: "0.5s !important",
    zIndex: 119,
  },
  inner: {
    padding: "0px",
  },
  root: {},
  content: {
    height: "250px",
    background: "transparent",
    transitionDuration: "0.5s !important",
  },
  body: {
    padding: "0px",
  },
}));
