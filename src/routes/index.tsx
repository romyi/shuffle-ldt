import { createBrowserRouter } from "react-router-dom";
import { Home } from "./home";
import { Profile } from "./profile";
import App from "../App";
import { Reports } from "./reports";
import { Calculation } from "./calculation";

export const external_config = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "reports",
    element: <Reports />,
  },
  {
    path: "calculation",
    element: <Calculation />,
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: external_config,
  },
]);
