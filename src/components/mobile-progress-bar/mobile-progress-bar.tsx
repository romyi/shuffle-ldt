import { Progress } from "@mantine/core";

export const ProgressBar = () => {
  return (
    // <Stack spacing={"xs"}>

    <Progress
      size={"sm"}
      animate
      sections={[
        { value: 4, color: "pink" },
        { value: 10, color: "dark" },
      ]}
    />
    // </Stack>
  );
};
