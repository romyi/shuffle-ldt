import { Container, Divider, Footer, Group, Loader, Text } from "@mantine/core";
import { useRecoilState } from "recoil";
import { ui } from "@states/ui";
import { IconListDetails, IconTablePlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { calculation_state } from "@states/calculation";
import { useQueryClient } from "@tanstack/react-query";
import { keys } from "@network/keystore";
import { withIndicator } from "@hocs/index";

const IndicatedCalcIcon = withIndicator(IconTablePlus);

export const MobileFooter = () => {
  const [uistate, setuistate] = useRecoilState(ui);
  const client = useQueryClient();
  const navigate = useNavigate();
  const [calculation] = useRecoilState(calculation_state);
  const state = client.getQueryState<{ email: string; role: number }>(
    keys.user.me().queryKey
  );
  return (
    <Footer withBorder={false} height={70} zIndex={115}>
      <Container>
        <Group position="apart" noWrap={true}>
          {state?.status === "loading" && <Loader size={"xs"} />}
          <Text color="dimmed" size="sm" truncate>
            {state?.status === "error" ? (
              <Group noWrap spacing={"md"}>
                Гость
                <Divider orientation="vertical" />
                <Text
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate("/user")}
                >
                  Войти
                </Text>
              </Group>
            ) : (
              state?.data && state.data?.email
            )}
            {state?.data?.role === 999 && " - Администратор"}
          </Text>
          <Group grow={true} position="apart" spacing={"xl"} noWrap={true}>
            {state?.data?.role !== 999 ? (
              calculation.snapshot.district_display_alias ? (
                <IndicatedCalcIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/calculation");
                  }}
                  strokeWidth={1.5}
                  size={36}
                  color={uistate.drawer === "calculation" ? "#D6336C" : "black"}
                />
              ) : (
                <IconTablePlus
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/calculation");
                  }}
                  strokeWidth={1.5}
                  size={36}
                  color={uistate.drawer === "calculation" ? "#D6336C" : "black"}
                />
              )
            ) : null}
            <IconListDetails
              style={{ cursor: "pointer" }}
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
