import { createBrowserRouter } from "react-router-dom";
import { Home } from "./home";
import { Profile } from "./profile";
import App from "../App";
import { Reports } from "./reports";
import { Calculation } from "./calculation";
import { FacilitiesInfo } from "./facilities-info";
import { MoscowMap } from "@components/deckgl-moscow-map";
import { AreaInfo } from "./personnel";

export const external_config = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "user",
    element: <Profile />,
  },
  {
    path: "reports",
    element: <Reports />,
  },
  {
    path: "calculation",
    element: <Calculation />,
    children: [
      {
        path: "",
        element: <MoscowMap />,
      },
      {
        path: "facilities",
        element: <FacilitiesInfo />,
      },
      {
        path: "third",
        element: <AreaInfo />,
      },
    ],
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: external_config,
  },
]);
