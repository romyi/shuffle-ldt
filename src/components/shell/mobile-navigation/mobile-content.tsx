import { useClearSnapshot } from "@features/follow-user-calculation-experience/hooks/useClearSnapshot";
import { Container, Text, Stack } from "@mantine/core";
import { keys } from "@network/index";
import {
  admin_auth,
  auth_user_navigation,
  unauth_user_navigation,
} from "@routes/configs";
import { ui } from "@states/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { LinkItem } from "./link-item";

export const MobileContent = () => {
  const client = useQueryClient();

  const [uistate, setuistate] = useRecoilState(ui);
  const navigate = useNavigate();
  const clearShapshot = useClearSnapshot();
  const data = client.getQueryData<{ role: number }>(keys.user.me().queryKey);
  const config = data
    ? data.role === 999
      ? admin_auth
      : auth_user_navigation
    : unauth_user_navigation;
  return (
    <Container mt="md" size={"xs"} p="md" h="500px">
      <Stack spacing={"0px"}>
        {Object.keys(config).map((section) => {
          return (
            <>
              <Text key={section} mb="md" size={"sm"}>
                {section}
              </Text>
              <Stack spacing={0} mb="xl">
                {config[section].map((link) => {
                  return (
                    <LinkItem
                      key={link.description}
                      callback={() => {
                        if (link.path === "/calculation") clearShapshot();
                        if (link.label === "Выйти") {
                          localStorage.clear();
                          navigate(link.path);
                          // client.invalidateQueries({
                          //   queryKey: keys.user.me().queryKey,
                          // });
                          window.location.reload();
                        }
                        setuistate({ ...uistate, drawer: null });
                        navigate(link.path);
                      }}
                      Icon={link.icon}
                      label={link.label}
                      description={link.description}
                      path={link.path}
                    />
                  );
                })}
              </Stack>
            </>
          );
        })}
      </Stack>
    </Container>
  );
};
