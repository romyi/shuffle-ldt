import { Accordion, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { keys } from "@network/index";
import { useQuery } from "@tanstack/react-query";
import { Calculation } from "@tyles/calculation";
import { format } from "date-fns";
import { ru as russian } from "date-fns/locale";

const prettify = (input: number) => {
  return input / 1000;
};

export const ControlContent: React.FC<{
  item: {
    from: string;
    to: string;
    id: string;
    request: Calculation;
    date: string;
  };
}> = ({ item }) => {
  const { data } = useQuery({ ...keys.static.industries() });

  return (
    <Accordion.Control>
      <Group position="left" noWrap align={"center"}>
        <SimpleGrid cols={2} miw="120px">
          <Stack spacing={0}>
            <Text fw={800}>{prettify(Number(item?.from)).toFixed(1)}</Text>
            <Text size={"xs"} color={"dimmed"}>
              {"от млн."}
            </Text>
          </Stack>
          <Stack spacing={0}>
            <Text color={"cyan"} fw={800}>
              {prettify(Number(item?.to)).toFixed(1)}
            </Text>
            <Text size={"xs"} color={"dimmed"}>
              {"до млн."}
            </Text>
          </Stack>
        </SimpleGrid>
        <Text maw="160px" lineClamp={2} size="xs" weight={"400"} color="dimmed">
          {typeof item?.request.branch === "number"
            ? data?.[item?.request.branch as number].name
            : "-"}
        </Text>
        <Stack ml="auto" spacing={0}>
          <Text size={"10px"}>
            {format(new Date(item?.date), "dd.MM ", {
              locale: russian,
            })}
          </Text>
          <Text size={"10px"} color="dimmed">
            {format(new Date(item?.date), "HH:MM", {
              locale: russian,
            })}
          </Text>
        </Stack>
      </Group>
    </Accordion.Control>
  );
};
