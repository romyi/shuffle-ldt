import { Accordion, Group, Stack, Text } from "@mantine/core";
import { Calculation } from "@tyles/calculation";
import { ReactNode } from "react";
import { ControlContent, ItemActions } from "./report-item-blocks";
import React from "react";

export const ReportInfo: React.FC<{ children: [ReactNode, ReactNode] }> = (
  props
) => {
  return (
    <Stack spacing={0}>
      {props.children[0]}
      {props.children[1]}
    </Stack>
  );
};

export const CalculationReportItem: React.FC<{
  item: {
    from: string;
    to: string;
    id: string;
    request: Calculation;
    date: string;
  };
}> = ({ item }) => {
  return (
    <Accordion.Item value={item.id} sx={{ position: "relative" }}>
      <ControlContent
        date={item.date}
        from={item.from}
        to={item.to}
        branch={item.request.branch}
      />
      <Accordion.Panel>
        <Group m="4px" fz={"xs"} spacing={"xl"}>
          <ReportInfo>
            <Text>{item?.request?.personnel}</Text>
            <Text color="dimmed">человек</Text>
          </ReportInfo>
          <ReportInfo>
            <Text>{item?.request?.landSquare} м²</Text>
            <Text color="dimmed">участок</Text>
          </ReportInfo>
          <ReportInfo>
            <Text>{item?.request?.facilitySquare} м²</Text>
            <Text color="dimmed"> постройки</Text>
          </ReportInfo>
        </Group>
        <ItemActions itemId={item.id} />
      </Accordion.Panel>
    </Accordion.Item>
  );
};
