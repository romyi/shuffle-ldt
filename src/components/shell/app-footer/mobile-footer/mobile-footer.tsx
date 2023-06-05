import {
  Container,
  Footer,
  Group,
  Indicator,
  Loader,
  Text,
} from "@mantine/core";
import { useRecoilState } from "recoil";
import { ui } from "@states/ui";
import { IconListDetails, IconTablePlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { calculation_state } from "@states/calculation";
import { useQuery } from "@tanstack/react-query";
import { keys } from "@network/keystore";

export const MobileFooter = () => {
  const [uistate, setuistate] = useRecoilState(ui);
  const navigate = useNavigate();
  const [calculation] = useRecoilState(calculation_state);
  const { isError, isFetching, data: me } = useQuery(keys.user.me());
  return (
    <Footer withBorder={false} height={70} zIndex={115}>
      <Container>
        <Group position="apart" noWrap={true}>
          {isFetching && <Loader size={"xs"} />}
          <Text color="dimmed" size="sm" truncate>
            {isError && "Гость"}
            {me && me.email}
          </Text>
          <Group grow={true} position="apart" spacing={"xl"} noWrap={true}>
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
