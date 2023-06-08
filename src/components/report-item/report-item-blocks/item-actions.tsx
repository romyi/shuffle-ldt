import { ReportFeedback } from "@features/gather-user-feedback";
import { Button, Group, LoadingOverlay } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { alarmReport, archiveReport, keys } from "@network/index";
import { IconAlarm } from "@tabler/icons-react";
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
  const { mutate: report, isLoading: isReporting } = useMutation(alarmReport, {
    onSuccess: () =>
      notifications.show({
        sx: { marginTop: "48px" },
        title: "Сообщение отправлено",
        message: "Рассмотрим как можно скорее",
        color: "pink",
        icon: <IconAlarm size={16} stroke={1.5} />,
        autoClose: 4000,
      }),
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
    <Group spacing={"xs"} mt="48px">
      <LoadingOverlay
        visible={
          (isFetching || isLoading || isReporting) &&
          params.get("id") === item.id
        }
        overlayBlur={2}
      />
      <Button size={"sm"} color="cyan" variant="light" onClick={handleClick}>
        Загрузить PDF отчет
      </Button>
      <Button
        fw="400"
        size={"xs"}
        color="pink"
        variant={"subtle"}
        onClick={handleRemoveClik}
      >
        Удалить
      </Button>
      <ReportFeedback item={item.request} report={report} />
    </Group>
  );
};
