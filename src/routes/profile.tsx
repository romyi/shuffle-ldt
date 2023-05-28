import { Authorization } from "@features/follow-user-onboarding";
import { ProfileGrid } from "@features/user-profile-edit";
import { Container, LoadingOverlay, Title } from "@mantine/core";
import { keys } from "@network/index";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@tyles/user";

export const Profile = () => {
  const client = useQueryClient();
  const { isFetching, isError: isUserUnauthorized } = useQuery(keys.user.me());
  const data = client.getQueryData<User>(keys.user.me().queryKey);

  if (isUserUnauthorized) {
    return (
      <Container>
        <Authorization />
      </Container>
    );
  } else {
    return (
      <Container>
        <Title order={4}>Личные данные</Title>
        <LoadingOverlay visible={isFetching} />
        {data && <ProfileGrid data={data} />}
      </Container>
    );
  }
};
