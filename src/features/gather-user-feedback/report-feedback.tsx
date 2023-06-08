import { Button } from "@mantine/core";
import { Calculation } from "@tyles/calculation";

export const ReportFeedback: React.FC<{
  item: Calculation;
  report: (arg0: Calculation) => void;
}> = ({ item, report }) => {
  const onAlarmClick = () => report(item);
  return (
    // <LoadingOverlay visible={isLoading}>
    <Button
      fw="400"
      size={"xs"}
      color="gray"
      variant={"subtle"}
      onClick={onAlarmClick}
    >
      Сообщить об ошибке
    </Button>
    // </LoadingOverlay>
  );
};
