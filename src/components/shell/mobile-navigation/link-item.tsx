import { NavLink } from "@mantine/core";
import { TablerIconsProps } from "@tabler/icons-react";
import { useMatch } from "react-router-dom";

export const LinkItem: React.FC<{
  callback: () => void;
  path: string;
  label: string;
  description: string;
  Icon: React.FC<TablerIconsProps>;
}> = ({ callback, path, label, description, Icon }) => {
  return (
    <NavLink
      color={"pink"}
      variant={"subtle"}
      active={Boolean(useMatch(path) && label !== "Выйти")}
      label={label}
      description={description}
      icon={<Icon size={24} />}
      onClick={callback}
    />
  );
};
