import React from "react";
import ReactDOM from "react-dom/client";
import { Global } from "@mantine/core";
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

    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
