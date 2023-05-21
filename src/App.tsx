import { AppShell } from "@mantine/core";
import {
  MobileDrawer,
  MobileFooter,
  MobileHeader,
  MobileNavigation,
} from "@components/shell";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  return (
    <AppShell padding={0} header={<MobileHeader />} footer={<MobileFooter />}>
      <Outlet />
      <MobileDrawer />
      <MobileNavigation />
    </AppShell>
  );
};

export default App;
