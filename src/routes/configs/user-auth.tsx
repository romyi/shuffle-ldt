import {
  IconBellQuestion,
  IconDoorExit,
  IconFaceId,
  IconFileCheck,
  IconTablePlus,
} from "@tabler/icons-react";
import { RouteConfig } from "@tyles/configs";

export const auth_user_navigation: RouteConfig = {
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
      label: "Список",
      description: "Посмотреть список расчётов",
    },
  ],
  Управление: [
    {
      path: "/user",
      icon: IconFaceId,
      label: "Ваш профиль",
      description: "Редактирование личных данных и настройки",
    },
    {
      path: "/",
      icon: IconDoorExit,
      label: "Выйти",
      description: "Затем можно зайти под другими данными",
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
