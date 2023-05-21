import { Flex, Footer } from "@mantine/core";
import { IconApps, IconHome2, IconMenu2 } from "@tabler/icons-react";
import { useRecoilState } from "recoil";
import { drawer_state } from "@states/index";
import { nav_drawer_state } from "@states/ui/navigation";

export const MobileFooter = () => {
  const [drawer, setDrawer] = useRecoilState(drawer_state);
  const [, setND] = useRecoilState(nav_drawer_state);
  const onIconClick = () => {
    setDrawer({ isOpen: !drawer.isOpen });
  };
  const onMenuClick = () => {
    setND({ isOpen: true });
  };
  return (
    <Footer height={80} p="sm" withBorder={false}>
      <Flex justify={"center"} gap={"70px"}>
        <Flex p="md" justify={"center"} gap={"70px"}>
          <IconHome2 size={32} />
          <IconMenu2 size={32} onClick={onMenuClick} />
          <IconApps size={32} onClick={onIconClick} />
        </Flex>
        {/* <img alt="moscow" src={Moscow} /> */}
      </Flex>
    </Footer>
  );
};
