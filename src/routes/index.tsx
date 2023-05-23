import { createBrowserRouter } from "react-router-dom";
import { Home } from "./home";
import { Profile } from "./profile";
import App from "../App";
import { Reports } from "./reports";

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
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: external_config,
  },
]);
