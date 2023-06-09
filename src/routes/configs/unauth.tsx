import {
  IconBellQuestion,
  IconFaceId,
  IconFileCheck,
  IconTablePlus,
} from "@tabler/icons-react";
import { RouteConfig } from "@tyles/configs";

export const unauth_user_navigation: RouteConfig = {
  Расчёты: [
    {
      path: "/calculation",
      icon: IconTablePlus,
      label: "Новый",
      description:
        "Если Вы начинали заполнять данные в калькуляторе, они будут утеряны",
    },
    {
      path: "/",
      icon: IconFileCheck,
      label: "Предприятие Москва",
      description: "Добро пожаловать",
    },
  ],
  Управление: [
    {
      path: "/user",
      icon: IconFaceId,
      label: "Регистрация и вход",
      description: "Заполнить ИНН, ФИО и получить подробный отчет",
    },
  ],
  "Обратная связь": [
    {
      path: "/question",
      icon: IconBellQuestion,
      label: "Задать вопрос",
      description: "Хотите что-либо узнать у нас или дать совет? Будем рады",
    },
  ],
};
