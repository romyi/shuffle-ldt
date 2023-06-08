import { Accordion, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { keys } from "@network/index";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ru as russian } from "date-fns/locale";

const prettify = (input: number) => {
  return input / 1000;
};

export const ControlContent: React.FC<{
  date: string;
  branch: number | string | null;
  from: string;
  to: string;
}> = ({ date, branch, from, to }) => {
  const { data } = useQuery({ ...keys.static.industries() });
  return (
    <Accordion.Control>
      <Group position="left" noWrap align={"center"}>
        <SimpleGrid cols={2} miw="120px">
          <Stack spacing={0}>
            <Text fw={800}>{prettify(Number(from)).toFixed(1)}</Text>
            <Text size={"xs"} color={"dimmed"}>
              {"от млн."}
            </Text>
          </Stack>
          <Stack spacing={0}>
            <Text color={"cyan"} fw={800}>
              {prettify(Number(to)).toFixed(1)}
            </Text>
            <Text size={"xs"} color={"dimmed"}>
              {"до млн."}
            </Text>
          </Stack>
        </SimpleGrid>
        <Text maw="160px" lineClamp={2} size="xs" weight={"400"}>
          {typeof branch === "number" && data?.[branch as number].name}
          {typeof branch === "string" && branch}
        </Text>
        <Stack ml="auto" spacing={0}>
          <Text size={"10px"}>
            {format(new Date(date), "dd.MM", {
              locale: russian,
            })}
          </Text>
          <Text size={"10px"} color="dimmed">
            {format(new Date(date), "HH:mm", {
              locale: russian,
            })}
          </Text>
        </Stack>
      </Group>
    </Accordion.Control>
  );
};
