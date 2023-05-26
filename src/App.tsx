import { useEffect } from "react";
import { AppShell, MantineProvider } from "@mantine/core";
import {
  BigNavbar,
  MobileFooter,
  MobileHeader,
  MobileNavigation,
} from "@components/shell";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useMediaQuery } from "@mantine/hooks";
import { MobileCalculationTracker } from "./containers";
import { calculation_state } from "@states/calculation";

const App: React.FC = () => {
  const smallScreen = useMediaQuery("(max-width: 1080px");

  const state = useRecoilValue(calculation_state);
  useEffect(() => {
    window.addEventListener("beforeunload", () =>
      localStorage.setItem("snapshot", JSON.stringify(state.snapshot))
    );
    return () => {
      window.removeEventListener("beforeunload", () =>
        localStorage.setItem("snapshot", JSON.stringify(state.snapshot))
      );
    };
  }, [state.snapshot]);
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
