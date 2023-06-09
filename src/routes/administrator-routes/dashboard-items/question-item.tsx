import { Accordion } from "@mantine/core";
import { Feed, FeedCommon, FeedQuestion } from "@tyles/feedbacks";

export const QuestionItem: React.FC<FeedQuestion> = (props) => {
  return (
    <Accordion.Item key={props.id} value={props.id}>
      <Accordion.Control>{props.author}</Accordion.Control>
      <Accordion.Panel>question</Accordion.Panel>
    </Accordion.Item>
  );
};

export const isQuestion = (f: Feed): f is FeedQuestion =>
  (f as FeedCommon).score === undefined;
