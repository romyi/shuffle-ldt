import { Authorization } from "@features/follow-user-onboarding";
import { ProfileGrid } from "@features/user-profile-edit";
import { Container, LoadingOverlay, Title } from "@mantine/core";
import { keys } from "@network/index";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const Profile = () => {
  const client = useQueryClient();
  const { isFetching, isError: isUserUnauthorized } = useQuery(keys.user.me());
  const data = client.getQueryData<{ email: string }>(keys.user.me().queryKey);

  if (isUserUnauthorized) {
    return (
      <Container>
        <Authorization />
      </Container>
    );
  } else {
    return (
      <Container>
        <Title>{data?.email}</Title>
        <LoadingOverlay visible={isFetching} />
        <ProfileGrid />
      </Container>
    );
  }
};
