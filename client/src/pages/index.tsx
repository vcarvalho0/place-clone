import { useRef, useEffect, useCallback, useState } from "react"
import Canvas from "@/components/Canvas"
import { useWebSocket } from "@/hooks/websocket"
import { usePallete } from "@/context/palette"
import { pallete } from "@/utils/pallete"
import { Position } from "@/utils/math"
import * as S from "./style"
import { api } from "@/utils/api"

const CANVAS_HEIGHT = 1000
const CANVAS_WIDTH = 1000

export default function Place() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [coords, setCoords] = useState<Position>({ x: 0, y: 0 })
  const [loading, setLoading] = useState(false)
  const { index } = usePallete()

  const { sendJsonMessage, isConnected, socket } = useWebSocket({
    url: `${import.meta.env.BASE_URL}/api/v1/draw`
  })

  const sendTilePlacement = () => {
    if (isConnected) {
      drawTile(coords.x, coords.y, pallete[index].hex)
      sendJsonMessage({ x: coords.x, y: coords.y, color: index })
    }
  }

  const drawTile = useCallback((x: number, y: number, color: string) => {
    const ctx = canvasRef.current?.getContext("2d")
    if (ctx) {
      ctx.fillStyle = color
      ctx.fillRect(x, y, 1, 1)
    }
  }, [])

  const loadBitmapState = useCallback(
    (bitmap: Uint8Array) => {
      for (let x = 0; x < CANVAS_WIDTH; x++) {
        for (let y = 0; y < CANVAS_HEIGHT; y++) {
          const bytesOffset = x + CANVAS_WIDTH * y
          const upperBits = bytesOffset % 2 === 0
          const offset = Math.floor(bytesOffset / 2)
          const offsetVal = bitmap[offset]
          const color = upperBits ? (offsetVal & 0xf0) >> 4 : offsetVal & 0x0f
          drawTile(x, y, pallete[color].hex)
        }
      }
    },
    [drawTile]
  )

  useEffect(() => {
    setLoading(true)
    api(`/api/v1/bitmap`)
      .then((res) => {
        if (res.ok) {
          return res.arrayBuffer()
        }

        throw new Error("Error while fetching the bitmap")
      })
      .then((buffer) => {
        const bitmap = new Uint8Array(buffer)

        loadBitmapState(bitmap)
      })
      .finally(() => setLoading(false))
  }, [loadBitmapState])

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const { x, y, color } = JSON.parse(event.data)
        drawTile(x, y, color)
      }
    }
  }, [drawTile, socket])

  return (
    <S.Container>
      <Canvas
        canvasRef={canvasRef}
        width={1000}
        height={1000}
        isLoading={loading}
        coords={coords}
        setCoords={setCoords}
        drawTile={sendTilePlacement}
        keyboardDrawTile={sendTilePlacement}
      />
    </S.Container>
  )
}
