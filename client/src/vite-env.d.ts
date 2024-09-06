/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEBSOCKET_SERVICE: string
  readonly VITE_REDIS: string
}

interface ImportMeta {
  readonly env: ImportMeta
}
