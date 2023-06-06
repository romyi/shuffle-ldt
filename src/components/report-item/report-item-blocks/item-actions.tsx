import { ReportFeedback } from "@features/gather-user-feedback";
import { Button, Group, LoadingOverlay } from "@mantine/core";
import { archiveReport, keys } from "@network/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Calculation } from "@tyles/calculation";
import { useSearchParams } from "react-router-dom";

export const ItemActions: React.FC<{
  item: {
    from: string;
    to: string;
    id: string;
    request: Calculation;
    date: string;
  };
}> = ({ item }) => {
  const { refetch, isFetching } = useQuery({
    ...keys.reports.pdf({ id: item.id }),
    enabled: false,
  });
  const client = useQueryClient();
  const { mutate: archive, isLoading } = useMutation(archiveReport, {
    onSuccess: () =>
      client.invalidateQueries({ queryKey: keys.reports.list().queryKey }),
  });

  const handleClick = () =>
    refetch().then((data) => {
      window.open(data.data.link, "_blank");
      data.data.revoke();
    });
  const handleRemoveClik = () => {
    archive(item.id);
  };
  const [params] = useSearchParams();

  return (
    <Group spacing={"xs"} noWrap mt="48px">
      <LoadingOverlay
        visible={(isFetching || isLoading) && params.get("id") === item.id}
        overlayBlur={2}
      />
      <Button size={"xs"} color="cyan" variant="light" onClick={handleClick}>
        Загрузить PDF отчет
      </Button>
      <Button
        size={"xs"}
        color="pink"
        variant={"subtle"}
        onClick={handleRemoveClik}
      >
        Удалить
      </Button>
      <ReportFeedback />
    </Group>
  );
};
