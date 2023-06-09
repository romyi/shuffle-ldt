import { IconDashboard, IconDoorExit } from "@tabler/icons-react";
import { RouteConfig } from "@tyles/configs";

export const admin_auth: RouteConfig = {
  Управление: [
    {
      path: "/",
      icon: IconDashboard,
      label: "Дашборд",
      description: "Управление обратной связью",
    },
    {
      path: "/",
      icon: IconDoorExit,
      label: "Выйти",
      description: "Затем можно зайти под другими данными",
    },
  ],
};
