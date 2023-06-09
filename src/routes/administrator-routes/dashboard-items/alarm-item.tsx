import { Accordion } from "@mantine/core";
import { Feed, FeedAlarm } from "@tyles/feedbacks";

export const AlarmItem: React.FC<FeedAlarm> = (props) => {
  return (
    <Accordion.Item key={props.id} value={props.id}>
      <Accordion.Control>{props.author}</Accordion.Control>
      <Accordion.Panel>alarm</Accordion.Panel>
    </Accordion.Item>
  );
};

export const isAlarm = (f: Feed): f is FeedAlarm => {
  return (f as FeedAlarm).input !== undefined;
};
