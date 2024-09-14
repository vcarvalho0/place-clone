type WebSocketMessage =
  | string
  | ArrayBuffer
  | SharedArrayBuffer
  | Blob
  | ArrayBufferView

export type SendMessage = (message: WebSocketMessage) => void
export type SendJsonMessage = <T = unknown>(message: T) => void
