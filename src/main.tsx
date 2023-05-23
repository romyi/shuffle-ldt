import React from "react";
import ReactDOM from "react-dom/client";
import { Global, MantineProvider } from "@mantine/core";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Global
      styles={[
        {
          "*": {
            boxSizing: "border-box",
          },
        },
        {
          "@font-face": {
            fontFamily: "MCW",
            src: `url('/mcw_regular.woff') format("woff")`,
            fontWeight: 400,
            fontStyle: "regular",
          },
        },
        {
          "@font-face": {
            fontFamily: "MCW",
            src: `url('/mcw_medium.woff') format("woff")`,
            fontWeight: 600,
            fontStyle: "regular",
          },
        },
        {
          "@font-face": {
            fontFamily: "MCW",
            src: `url('/mcw_bold.woff') format("woff")`,
            fontWeight: 800,
            fontStyle: "regular",
          },
        },
      ]}
    />
    <MantineProvider
      theme={{
        focusRing: "never",
        fontFamily: "MCW",
        primaryColor: "pink",
        breakpoints: {
          xs: "320",
          sm: "800",
        },
        colors: {
          "brand-red": [
            "#ffe2e2",
            "#ffb2b2",
            "#ff8080",
            "#fe4e4e",
            "#fe1f1c",
            "#e50a03",
            "#b20301",
            "#800000",
            "#4e0000",
            "#1f0000",
          ],
          "brand-hay": [
            "#fef6e7",
            "#fae5bc",
            "#f7d48e",
            "#f5c360",
            "#f2b236",
            "#d89823",
            "#a8771b",
            "#785513",
            "#48320a",
            "#181101",
          ],
        },
        components: {
          Text: {
            defaultProps: {
              color: "dark",
            },
          },
          Switch: {
            defaultProps: (theme) => ({
              color: theme.colors["brand-hay"][0],
            }),
          },
        },
        headings: {
          sizes: {
            h1: { fontWeight: 800 },
            h2: { fontWeight: 800 },
            h3: { fontWeight: 600 },
            h4: { fontWeight: 400 },
          },
        },
      }}
      withNormalizeCSS
    >
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </MantineProvider>
  </React.StrictMode>
);
