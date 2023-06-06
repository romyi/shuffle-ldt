import { Group } from "@mantine/core";
import { IconMoodSad, IconMoodSmileBeam } from "@tabler/icons-react";

export const ReportFeedback = () => {
  return (
    <Group m="auto">
      <IconMoodSmileBeam stroke={1.5} />
      <IconMoodSad stroke={1.5} />
    </Group>
  );
};
