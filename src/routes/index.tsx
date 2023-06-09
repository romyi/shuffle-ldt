import { createBrowserRouter } from "react-router-dom";
import { Profile } from "./profile";
import App from "../App";
import { Reports } from "./calculation-list";
import { Calculation } from "./calculation-form";
import { MoscowMap } from "@components/deckgl-moscow-map";
import { Legal, Stat } from "./calculation-form-subpages";
import { Questions } from "./questions";
import { NoPage } from "@components/ui-containers";
import { Dashboard } from "./administrator-routes/dashboard";

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
  {
    path: "question",
    element: <Questions />,
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NoPage />,
    children: external_config,
  },
]);

export const admin_router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NoPage />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
]);

export const fallback_tree = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NoPage />,
    children: [
      {
        path: "",
        element: <Reports />,
      },
    ],
  },
]);
