import { Accordion } from "@mantine/core";
import { FeedCalculation, FeedCommon } from "@tyles/feedbacks";

export const UniversalItem: React.FC<FeedCalculation | FeedCommon> = (
  props
) => {
  return (
    <Accordion.Item key={props.id} value={props.id}>
      <Accordion.Control>{props.author}</Accordion.Control>
      <Accordion.Panel>common or calc</Accordion.Panel>
    </Accordion.Item>
  );
};
