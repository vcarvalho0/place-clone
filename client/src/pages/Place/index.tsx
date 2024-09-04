import { useRef, useState, MouseEvent, WheelEvent, useEffect } from "react"
import { SelectTool } from "@/components/Selector/style"
import { calculateDistance, Position } from "@/utils/math"
import { usePallete } from "@/context/palette"
import Menu from "@/components/Menu"
import Info from "@/components/Info"
import Pallete from "@/components/Pallete"
import * as S from "./style"

const PIXEL = 5
const THRESHOLD = 5

type PixelData = {
  x: number
  y: number
  color: string
}

export default function Place() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [lastMousePos, setLastMousePos] = useState<Position | null>(null)
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const [isPanning, setIsPanning] = useState(false)
  const [openPallete, setOpenPallete] = useState(false)
  const { color } = usePallete()

  const scaleOffsetCoords = (e: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const offsetX = (e.clientX - rect.left) / scale
    const offsetY = (e.clientY - rect.top) / scale

    return { x: offsetX, y: offsetY }
  }

  const onWheelZoomCanvas = (e: WheelEvent) => {
    setScale((prevScale) => {
      const newScale = e.deltaY > 0 ? prevScale - 1 : prevScale + 1
      return Math.min(Math.max(newScale, 1), 20)
    })
  }

  const onMouseDownPan = (e: MouseEvent) => {
    const position = scaleOffsetCoords(e)
    if (position && e.button === 0) {
      setLastMousePos(position)
    }
  }

  const onMouseMovePan = (e: MouseEvent) => {
    if (!lastMousePos) return

    const position = scaleOffsetCoords(e)
    if (!position) return

    const distance = calculateDistance(lastMousePos, position)
    const adjustedThreshold = Math.sqrt(THRESHOLD / scale)

    if (distance > adjustedThreshold || isPanning) {
      setIsPanning(true)
      setPan((prevCoords) => ({
        x: prevCoords.x + position.x - lastMousePos.x,
        y: prevCoords.y + position.y - lastMousePos.y
      }))
    }
  }

  const onMouseUpPan = (e: MouseEvent) => {
    if (!lastMousePos) return

    const position = scaleOffsetCoords(e)
    if (!position) return

    const distance = calculateDistance(lastMousePos, position)
    const adjustedThreshold = Math.sqrt(THRESHOLD / scale)

    if (distance < adjustedThreshold && !isPanning) {
      setCoordinates({
        x: Math.floor(position.x / PIXEL) * PIXEL,
        y: Math.floor(position.y / PIXEL) * PIXEL
      })
    }

    setIsPanning(false)
    setLastMousePos(null)
  }

  const drawPixel = (ctx: CanvasRenderingContext2D, pixel: PixelData) => {
    const [r, g, b] = pixel.color.split(" ").map(Number)

    const data = ctx.createImageData(5, 5)

    for (let i = 0; i < data.data.length; i += 4) {
      data.data[i] = r
      data.data[i + 1] = g
      data.data[i + 2] = b
      data.data[i + 3] = 255
    }

    ctx.putImageData(data, pixel.x, pixel.y)
  }

  const handlePixelPlace = () => {
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return

    const pixelData = {
      x: coordinates.x,
      y: coordinates.y,
      color: `${color.r} ${color.g} ${color.b}`
    }

    drawPixel(ctx, pixelData)

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(pixelData))
    }
  }

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws")
    setSocket(socket)

    socket.onmessage = (event) => {
      const pixel = JSON.parse(event.data)
      const ctx = canvasRef.current?.getContext("2d")
      if (ctx) drawPixel(ctx, pixel)
    }

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close()
      }
    }
  }, [])

  return (
    <S.Container>
      <S.TopContainer>
        <Info coords={{ x: coordinates.x, y: coordinates.y }} />
      </S.TopContainer>

      <S.Wrapper
        style={{
          transform: `scale(${scale}) translate(${pan.x}px, ${pan.y}px`
        }}
        onWheel={onWheelZoomCanvas}
      >
        <S.Canvas
          ref={canvasRef}
          width={1000}
          height={1000}
          onMouseDown={onMouseDownPan}
          onMouseMove={onMouseMovePan}
          onMouseUp={onMouseUpPan}
        />
        <SelectTool
          pixelSize={PIXEL}
          style={{
            transform: `translate(${coordinates.x}px, ${coordinates.y}px)`
          }}
        />
      </S.Wrapper>

      <S.BottomContainer>
        {!openPallete && (
          <Menu
            handlePlacePixel={handlePixelPlace}
            handleOpenPallete={() => setOpenPallete(true)}
            scaleLevel={scale}
            currentColor={color}
          />
        )}
      </S.BottomContainer>

      <S.PalleteContainer>
        {openPallete && (
          <Pallete
            openPallete={openPallete}
            closePallete={() => setOpenPallete(false)}
          />
        )}
      </S.PalleteContainer>
    </S.Container>
  )
}
