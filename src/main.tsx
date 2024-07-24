import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./context/AuthProvider.tsx";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <TonConnectUIProvider
      manifestUrl={"https://192.168.18.201:3000/tonconnect-manifest.json"}
      actionsConfiguration={{
        twaReturnUrl: `https://t.me/${import.meta.env.VITE_TELEGRAM_APP}`,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </TonConnectUIProvider>
  </React.StrictMode>
);
