import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useIsConnectionRestored, useTonWallet } from "@tonconnect/ui-react";

const router = createRouter({
  routeTree,
  context: { wallet: null, connectionRestored: false },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  const wallet = useTonWallet();
  const connectionRestored = useIsConnectionRestored();

  return (
    <RouterProvider router={router} context={{ wallet, connectionRestored }} />
  );
};

export default App;
