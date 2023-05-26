import {
  Container,
  createStyles,
  Footer,
  Group,
  Indicator,
  Text,
} from "@mantine/core";
import { useRecoilState, useRecoilValue } from "recoil";
import { ui } from "@states/ui_state";
import { IconListDetails, IconTablePlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { calculation_state } from "@states/calculation";

const useFooterStyles = createStyles({
  root: {
    zIndex: 100,
  },
});

export const MobileFooter = () => {
  const [uistate, setuistate] = useRecoilState(ui);
  const { classes } = useFooterStyles();
  const navigate = useNavigate();
  const [calculation, setcalculation] = useRecoilState(calculation_state);
  return (
    <Footer
      classNames={{ root: classes.root }}
      withBorder={false}
      height={70}
      pt="md"
    >
      <Container pr="xl" pl="xl">
        <Group noWrap spacing="63px" position="apart" align="flex-end">
          <Text color="#DCE0E7" size="xs">
            Гость
          </Text>
          <Group spacing={"xl"} pr={"xl"}>
            {calculation.snapshot.district_display_alias && (
              <Indicator>
                <IconTablePlus
                  onClick={() => {
                    navigate("/calculation");
                  }}
                  strokeWidth={1.5}
                  size={36}
                  color={uistate.drawer === "calculation" ? "#D6336C" : "black"}
                />
              </Indicator>
            )}
            <IconListDetails
              onClick={() =>
                setuistate({
                  ...uistate,
                  drawer: "navigation",
                })
              }
              strokeWidth={1.5}
              size={36}
              color={uistate.drawer === "navigation" ? "#D6336C" : "black"}
            />
          </Group>
        </Group>
      </Container>
    </Footer>
  );
};
