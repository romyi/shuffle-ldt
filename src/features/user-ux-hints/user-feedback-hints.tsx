import { Text } from "@mantine/core";
import { IconQuestionMark } from "@tabler/icons-react";
import { createHint } from "./hints-factory";

export const QuestionHint = createHint(
  "Как и зачем задавать вопросы?",
  <Text size="sm">
    Вы наш пользователь и обратная связь крайне важна для нас. Если вы бы
    хотели, чтобы в сервисе появилась новая функциональность или у вас есть
    вопрос по имеющимся возможностям, то смело задавайте его нам.
  </Text>,
  <IconQuestionMark stroke={1.5} />
);

export const FrequentlyAskedHint = createHint(
  "Часто задаваемые вопросы",
  <Text size="sm">
    Мы вскоре добавим раздел FAQ, в котором будем публиковать ответы на вопросы,
    ответ на которые интересуют значительную часть пользователей.
  </Text>,
  <IconQuestionMark stroke={1.5} />
);
