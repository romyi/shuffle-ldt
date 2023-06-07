import { ControlContent, ReportInfo } from "@components/report-item";
import {
  Accordion,
  Button,
  createStyles,
  Group,
  Indicator,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Calculation } from "@tyles/calculation";
import { useNavigate } from "react-router-dom";
import { LARGE_SCREEN_EXTENT } from "../../../consts";

const useClasses = createStyles({
  item: {
    backgroundColor: "transparent",
    border: "0.0625rem solid #dee2e6",
  },
  chevron: {
    display: "none",
  },
});

export const CalculationItemDemo: React.FC<{
  item: Calculation & { from: string; to: string; time: string };
}> = ({ item }) => {
  const large = useMediaQuery(LARGE_SCREEN_EXTENT);
  const { classes } = useClasses();
  const navigate = useNavigate();
  const handleClick = () => navigate("/user");
  return (
    <Accordion
      classNames={{ item: classes.item, chevron: classes.chevron }}
      value="demo"
      variant="separated"
      sx={{ gridColumn: large ? "1/3" : "1/2" }}
    >
      <Accordion.Item value="demo">
        <Indicator processing>
          <ControlContent
            from={item.from}
            to={item.to}
            branch={item.branch_display_alias}
            date={item.time}
          />
        </Indicator>
        <Accordion.Panel>
          <Group m="4px" fz={"xs"} spacing={"xl"}>
            <ReportInfo>
              <Text>{item?.personnel}</Text>
              <Text color="dimmed">человек</Text>
            </ReportInfo>
            <ReportInfo>
              <Text>{item?.landSquare} м²</Text>
              <Text color="dimmed">участок</Text>
            </ReportInfo>
            <ReportInfo>
              <Text>{item?.facilitySquare} м²</Text>
              <Text color="dimmed"> постройки</Text>
            </ReportInfo>
          </Group>
          <Group spacing={"xs"} noWrap mt="48px">
            <Button
              size={"xs"}
              color="cyan"
              variant="light"
              onClick={handleClick}
            >
              Подтвердить e-mail и загрузить PDF отчет
            </Button>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
