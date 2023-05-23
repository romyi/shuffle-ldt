import { useDeferredValue, useEffect } from "react";
import { AppShell } from "@mantine/core";
import {
  MobileFooter,
  MobileHeader,
  MobileNavigation,
} from "@components/shell";
import { Outlet, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { nav_drawer_state } from "@states/ui/navigation";

const App: React.FC = () => {
  const location = useLocation();
  const [, setNavigation] = useRecoilState(nav_drawer_state);
  useEffect(() => {
    setNavigation({ isOpen: false });
  }, [location, setNavigation]);

  return (
    <AppShell padding={0} header={<MobileHeader />} footer={<MobileFooter />}>
      <Outlet />
      <MobileNavigation />
    </AppShell>
  );
};

export default App;
