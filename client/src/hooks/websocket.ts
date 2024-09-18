import { useCallback, useEffect, useState } from "react"
import { SendJsonMessage, SendMessage } from "./types"

type WebSocketOptions = {
  url: string
}

export const useWebSocket = ({ url }: WebSocketOptions) => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  const connect = useCallback(() => {
    const ws = new WebSocket(url)

    ws.onopen = () => {
      setIsConnected(true)
    }

    ws.onclose = () => {
      setIsConnected(false)
    }

    ws.onerror = (error) => {
      console.error("WebSocket error: ", error)
    }

    setSocket(ws)
  }, [url])

  useEffect(() => {
    connect()

    return () => {
      if (socket) {
        socket.close()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connect])

  const sendMessage: SendMessage = (message) => {
    if (socket && socket.readyState === socket.OPEN) {
      socket.send(message)
    } else {
      console.warn("WebSocket is not connected, fail sending message")
    }
  }

  const sendJsonMessage: SendJsonMessage = (message) => {
    sendMessage(JSON.stringify(message))
  }
  return { socket, sendMessage, sendJsonMessage, isConnected }
}
