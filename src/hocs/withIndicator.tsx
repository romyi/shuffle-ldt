import { Indicator } from "@mantine/core";

export const withIndicator = <K extends object>(
  Component: React.ComponentType<K>
) => {
  const IndicatedComponent = (props: K) => {
    return (
      <Indicator>
        <Component {...props} />
      </Indicator>
    );
  };
  return IndicatedComponent;
};
