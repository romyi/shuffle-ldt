import { SMALL_SCREEN_EXTENT } from "@const";
import { Authorization } from "@features/follow-user-onboarding";
import { ProfileGrid } from "@features/user-profile-edit";
import { ProfilePageHint } from "@features/user-ux-hints";
import { Container, LoadingOverlay, SimpleGrid, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { keys } from "@network/index";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@tyles/user";

export const Profile = () => {
  const client = useQueryClient();
  const { isFetching, isError: isUserUnauthorized } = useQuery(keys.user.me());
  const data = client.getQueryData<User>(keys.user.me().queryKey);
  const small = useMediaQuery(SMALL_SCREEN_EXTENT);

  if (isUserUnauthorized) {
    return (
      <Container>
        <Authorization />
      </Container>
    );
  } else {
    return (
      <Container p={small ? "0px" : "sm"}>
        <Title order={4}>Профиль пользователя</Title>
        <SimpleGrid mt="xl" sx={{ position: "relative" }}>
          <ProfilePageHint />
          <LoadingOverlay visible={isFetching} />
          {data && <ProfileGrid data={data} />}
        </SimpleGrid>
      </Container>
    );
  }
};
