import { Center, Loader } from "@mantine/core";
import { keys } from "@network/index";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { admin_router, fallback_tree, router } from ".";

const useRoleBasedRouting = () => {
  const { data: me, isError } = useQuery(keys.user.me());
  const [tree, settree] = useState(fallback_tree);
  const [treeloaded, settreeloaded] = useState(false);
  useEffect(() => {
    if (isError) {
      settree(router);
      settreeloaded(true);
    }
    if (me?.role === 999) {
      settree(admin_router);
      settreeloaded(true);
    }
    if (me?.role === 1) {
      settree(router);
      settreeloaded(true);
    }
  }, [me, isError]);
  return { tree, treeloaded };
};

export const RoleBasedRouterProvider = () => {
  const { tree: routeTree, treeloaded } = useRoleBasedRouting();
  if (treeloaded) return <RouterProvider router={routeTree} />;
  return (
    <Center h={"90vh"}>
      <Loader size="sm" color="pink" />
    </Center>
  );
};
