import { useCallback, useEffect, useRef, useState } from "react"
import { SendJsonMessage, SendMessage } from "./types"

type WebSocketOptions = {
  url: string
}

export const useWebSocket = ({ url }: WebSocketOptions) => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const reconnectTimeoutRef = useRef<number | null>(null)

  const stablishConnection = useCallback(() => {
    const ws = new WebSocket(url)

    ws.onopen = () => {
      setIsConnected(true)
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
        reconnectTimeoutRef.current = null
      }
    }

    ws.onclose = () => {
      setIsConnected(false)
      reconnectTimeoutRef.current = window.setTimeout(() => {
        stablishConnection()
      }, 5000)
    }

    ws.onerror = (error) => {
      console.error("WebSocket error: ", error)
    }

    setSocket(ws)
  }, [url])

  useEffect(() => {
    stablishConnection()

    return () => {
      if (socket) {
        socket.close()
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stablishConnection])

  const sendMessage: SendMessage = (message) => {
    if (socket && socket.readyState === socket.OPEN) {
      socket.send(message)
    } else {
      console.warn("WebSocket is not connected. Fail sending message")
    }
  }

  const sendJsonMessage: SendJsonMessage = (message) => {
    sendMessage(JSON.stringify(message))
  }

  return { socket, sendMessage, sendJsonMessage, isConnected }
}
