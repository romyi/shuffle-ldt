import { createBrowserRouter } from "react-router-dom";
import { Home } from "./home";
import { Profile } from "./profile";
import App from "../App";
import { Reports } from "./reports";
import { Calculation } from "./calculation";
import { FacilitiesInfo } from "./facilities-info";
import { MoscowMap } from "@components/deckgl-moscow-map";
import { AreaInfo } from "./personnel";

const calculation_config = [
  { path: "", element: <MoscowMap /> },
  {
    path: "stat",
    element: <FacilitiesInfo />,
  },
  {
    path: "legal",
    element: <AreaInfo />,
  },
];

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
    children: calculation_config,
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: external_config,
  },
]);
