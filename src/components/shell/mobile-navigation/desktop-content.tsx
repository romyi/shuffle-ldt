import { useClearSnapshot } from "@features/follow-user-calculation-experience/hooks/useClearSnapshot";
import { Container, Text, Stack, SimpleGrid } from "@mantine/core";
import { keys } from "@network/index";
import { ui } from "@states/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  admin_auth,
  auth_user_navigation,
  unauth_user_navigation,
} from "@routes/configs";
import { LinkItem } from "./link-item";

export const DesktopContent = () => {
  const client = useQueryClient();
  const [uistate, setuistate] = useRecoilState(ui);

  const data = client.getQueryData<{ role: number }>(keys.user.me().queryKey);
  const navigate = useNavigate();
  const clearShapshot = useClearSnapshot();
  const config = data
    ? data.role === 999
      ? admin_auth
      : auth_user_navigation
    : unauth_user_navigation;
  return (
    <Container mt="md" size={"md"} p="md">
      <SimpleGrid cols={3}>
        {Object.keys(config).map((section) => {
          return (
            <Stack key={section}>
              <Text size={"sm"}>{section}</Text>
              {config[section].map((link) => {
                return (
                  <LinkItem
                    key={link.description}
                    callback={() => {
                      if (link.path === "/calculation") clearShapshot();
                      if (link.label === "Выйти") {
                        localStorage.clear();
                        navigate(link.path);
                        // window.location.reload();

                        // хороший инвалидейт не смог стабильно прикрутить - работает через раз, буду разбираться
                        client.invalidateQueries({
                          queryKey: keys.user.me().queryKey,
                        });
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
          );
        })}
      </SimpleGrid>
    </Container>
  );
};
