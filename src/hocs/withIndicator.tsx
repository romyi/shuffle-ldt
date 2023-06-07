import { Indicator } from "@mantine/core";

export const withIndicator = (Component: React.FC) => {
  const Indicated = Component;
  return (props: any) => {
    return (
      <Indicator>
        <Indicated {...(props as object)} />
      </Indicator>
    );
  };
};
