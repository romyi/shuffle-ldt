import { useEffect } from "react";
import { AppShell, MantineProvider } from "@mantine/core";
import {
  BigNavbar,
  MobileFooter,
  MobileHeader,
  MobileNavigation,
} from "@components/shell";
import { Outlet, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ui } from "@states/ui_state";
import { useMediaQuery } from "@mantine/hooks";
import { MobileCalculationTracker } from "./containers";

const App: React.FC = () => {
  const location = useLocation();
  const smallScreen = useMediaQuery("(max-width: 1080px");
  const [, setuistate] = useRecoilState(ui);
  // useEffect(() => {
  //   setuistate({ navigation_drawer: false, calculation_drawer: false });
  // }, [location, setuistate]);

  return (
    <MantineProvider
      theme={{
        focusRing: "never",
        fontFamily: "MCW",
        primaryColor: "pink",
        breakpoints: {
          xs: "320",
          sm: "800",
          md: "1081",
        },
        fontSizes: {
          md: "16px",
        },
        components: {
          Text: {
            defaultProps: {
              color: "dark",
            },
          },
          Container: {
            defaultProps: {
              sx: {
                marginLeft: smallScreen ? "auto" : "180px",
              },
              size: smallScreen ? "xs" : "md",
            },
          },
        },
        headings: {
          sizes: {
            h1: { fontWeight: 800 },
            h2: { fontWeight: 800 },
            h3: { fontWeight: 600 },
            h4: { fontWeight: 400 },
          },
        },
      }}
      withNormalizeCSS
    >
      <AppShell
        layout="alt"
        padding={0}
        navbar={<BigNavbar />}
        header={smallScreen ? <MobileHeader /> : <></>}
        footer={smallScreen ? <MobileFooter /> : <></>}
      >
        <Outlet />
        <MobileNavigation />
        <MobileCalculationTracker />
      </AppShell>
    </MantineProvider>
  );
};

export default App;
