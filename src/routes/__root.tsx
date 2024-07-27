import RotateScreen from "@/components/common/RotateScreen";
import { createRootRoute, Outlet, useSearch } from "@tanstack/react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";
import WebcamContext from "@/context/WebcamContext";
import SoundContext from "@/context/SoundContext";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import AuthProvider from "@/context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 } },
});

dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(relativeTime);

const Root = () => {
  const ref: string | undefined = useSearch({
    select: (search) => search.ref,
    strict: false,
  });

  return (
    <TonConnectUIProvider
      manifestUrl={`${window.location.origin}/tonconnect-manifest.json`}
      actionsConfiguration={{
        twaReturnUrl: `https://t.me/${import.meta.env.VITE_TELEGRAM_APP}?ref=${ref}`,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <WebcamContext>
            <SoundContext>
              <RotateScreen />
              <div className="container">
                <Outlet />
              </div>
            </SoundContext>
          </WebcamContext>
        </AuthProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </TonConnectUIProvider>
  );
};

export const Route = createRootRoute({ component: Root });
