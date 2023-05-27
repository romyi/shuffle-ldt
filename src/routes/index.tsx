import { createBrowserRouter } from "react-router-dom";
import { Profile } from "./profile";
import App from "../App";
import { Reports } from "./reports";
import { Calculation } from "./calculation";
import { MoscowMap } from "@components/deckgl-moscow-map";
import { Legal, Stat } from "./calculation-form-subpages";

const calculation_config = [
  { path: "", element: <MoscowMap /> },
  {
    path: "stat",
    element: <Stat />,
  },
  {
    path: "legal",
    element: <Legal />,
  },
];

export const external_config = [
  {
    path: "",
    element: <Reports />,
  },
  {
    path: "user",
    element: <Profile />,
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
