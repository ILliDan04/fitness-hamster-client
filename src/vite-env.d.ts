/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TELEGRAM_APP: string;
  readonly VITE_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
