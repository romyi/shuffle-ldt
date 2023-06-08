import { createStyles } from "@mantine/core";

export const useClasses = createStyles((_, overflow?: boolean) => ({
  overlay: {
    transitionDuration: "0.5s !important",
    zIndex: 119,
  },
  inner: {
    padding: "0px",
    marginRight: "12px",
  },
  content: {
    overflow: overflow ? "auto" : "visible",
    height: "250px",
    background: "transparent",
    transitionDuration: "0.5s !important",
  },
  body: {
    padding: "0px",
  },
}));
