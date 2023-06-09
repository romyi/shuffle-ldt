import { useEffect } from "react";
import { AppShell, MantineProvider } from "@mantine/core";
import {
  MobileFooter,
  MobileHeader,
  MobileNavigation,
} from "@components/shell";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useMediaQuery } from "@mantine/hooks";
import { calculation_state, useRestoreSnapshot } from "@states/calculation";
import { LARGE_SCREEN_EXTENT, SMALL_SCREEN_EXTENT } from "./consts";
import { Notifications } from "@mantine/notifications";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryContent } from "./components";

const App: React.FC = () => {
  const smallScreen = useMediaQuery(SMALL_SCREEN_EXTENT);
  const largeScreen = useMediaQuery(LARGE_SCREEN_EXTENT);
  useRestoreSnapshot();

  const state = useRecoilValue(calculation_state);
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      const { snapshot } = state;
      const serial = JSON.stringify(snapshot);
      localStorage.setItem("snapshot", serial);
    });
    return () => {
      window.removeEventListener("beforeunload", () => {
        const { snapshot } = state;
        const serial = JSON.stringify(snapshot);
        localStorage.setItem("snapshot", serial);
      });
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
              size: smallScreen ? "xs" : "md",
              p: "sm",
            },
          },
          SimpleGrid: {
            defaultProps: {
              cols: smallScreen ? 1 : largeScreen ? 3 : 2,
            },
          },
          Title: {
            defaultProps: {
              order: 3,
              mb: "xl",
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
      <ErrorBoundary FallbackComponent={ErrorBoundaryContent}>
        <AppShell
          layout="alt"
          padding={12}
          header={<MobileHeader />}
          footer={<MobileFooter />}
        >
          <Notifications position="top-right" />
          <Outlet />
          <MobileNavigation />
        </AppShell>
      </ErrorBoundary>
    </MantineProvider>
  );
};

export default App;
