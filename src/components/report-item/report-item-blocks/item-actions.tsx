import { Button, Group, LoadingOverlay } from "@mantine/core";
import { archiveReport, keys } from "@network/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const ItemActions: React.FC<{
  itemId: string;
}> = ({ itemId }) => {
  const { refetch, isFetching } = useQuery({
    ...keys.reports.pdf({ id: itemId }),
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
    archive(itemId);
  };
  const [params] = useSearchParams();

  return (
    <Group spacing={"xs"} mt="48px">
      <LoadingOverlay
        visible={(isFetching || isLoading) && params.get("id") === itemId}
        overlayBlur={2}
      />
      <Button size={"sm"} color="cyan" variant="light" onClick={handleClick}>
        Загрузить PDF отчет
      </Button>
      <Button
        size={"sm"}
        color="pink"
        variant={"subtle"}
        onClick={handleRemoveClik}
      >
        Удалить
      </Button>
    </Group>
  );
};
