import React from "react";
import ReactDOM from "react-dom/client";
import { Global } from "@mantine/core";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RoleBasedRouterProvider } from "./routes/role-based-route-tree";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryContent } from "./components";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Global
      styles={[
        {
          "*": {
            boxSizing: "border-box",
          },
        },
        {
          "@font-face": {
            fontFamily: "MCW",
            src: `url('/mcw_regular.woff') format("woff")`,
            fontWeight: 400,
            fontStyle: "regular",
          },
        },
        {
          "@font-face": {
            fontFamily: "MCW",
            src: `url('/mcw_medium.woff') format("woff")`,
            fontWeight: 600,
            fontStyle: "regular",
          },
        },
        {
          "@font-face": {
            fontFamily: "MCW",
            src: `url('/mcw_bold.woff') format("woff")`,
            fontWeight: 800,
            fontStyle: "regular",
          },
        },
      ]}
    />
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ErrorBoundary FallbackComponent={ErrorBoundaryContent}>
          <RoleBasedRouterProvider />
        </ErrorBoundary>
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>
);
