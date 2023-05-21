import { createBrowserRouter } from "react-router-dom";
import { Home } from "./home";
import { Profile } from "./profile";
import App from "../App";

export const external_config = [
  {
    path: "",
    element: <Home />,
    slideIndex: 0,
  },
  {
    path: "profile",
    element: <Profile />,
    slideIndex: 1,
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: external_config,
  },
]);
