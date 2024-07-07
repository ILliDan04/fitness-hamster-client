import AuthContextProvider from "@/context/AuthContext";
import { ScreenOrientationContext } from "@/context/ScreenOrientationContext";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <AuthContextProvider>
        <ScreenOrientationContext>
          <Outlet />
        </ScreenOrientationContext>
      </AuthContextProvider>
      <TanStackRouterDevtools />
    </>
  ),
});
