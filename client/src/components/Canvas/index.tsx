import {
  useState,
  MouseEvent,
  WheelEvent,
  KeyboardEvent,
  MutableRefObject,
  useEffect
} from "react"
import { calculateDistance, Position } from "@/utils/math"
import Menu from "@/components/Menu"
import Info from "@/components/Info"
import Palette from "@/components/Palette"
import * as S from "./style"
import Loading from "../Loading"
import { usePalette } from "@/context/palette"
import Cursor from "../Cursor"

type CanvasActions = {
  drawTile: (e: MouseEvent<HTMLButtonElement>) => void
  keyboardDrawTile: (e: KeyboardEvent) => void
}

type CanvasProps = {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
  width: number
  height: number
  isLoading: boolean
  coords: Position
  setCoords: (pos: Position) => void
} & CanvasActions

export default function Canvas({
  canvasRef,
  width,
  height,
  coords,
  setCoords,
  isLoading,
  drawTile,
  keyboardDrawTile
}: CanvasProps) {
  const [lastMousePos, setLastMousePos] = useState<Position | null>(null)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const [isPanning, setIsPanning] = useState(false)
  const [pallete, setPallete] = useState(false)
  const { index } = usePalette()

  // Keep canvas focus when pallete changes
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.focus()
    }
  }, [canvasRef, index])

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
    const adjustedThreshold = Math.sqrt(1 / scale)

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
    const adjustedThreshold = Math.sqrt(1 / scale)

    if (distance < adjustedThreshold && !isPanning) {
      setCoords({
        x: Math.floor(position.x / 1) * 1,
        y: Math.floor(position.y / 1) * 1
      })
    }

    setIsPanning(false)
    setLastMousePos(null)
  }

  const registerHotKeys = (e: KeyboardEvent) => {
    let newX = coords.x
    let newY = coords.y

    switch (e.key) {
      case " ":
        keyboardDrawTile(e)
        break
      case "ArrowUp":
        newY = Math.max(0, coords.y - 1)
        break
      case "ArrowDown":
        newY = Math.min(height - 1, coords.y + 1)
        break
      case "ArrowLeft":
        newX = Math.max(0, coords.x - 1)
        break
      case "ArrowRight":
        newX = Math.min(width - 1, coords.x + 1)
        break
    }

    setCoords({ x: newX, y: newY })
    return { x: newX, y: newY }
  }

  return (
    <>
      <S.TopContainer>
        <Info coords={{ x: coords.x, y: coords.y }} />
      </S.TopContainer>

      <S.ScaleWrapper
        style={{ transform: `scale(${scale})` }}
        onWheel={onWheelZoomCanvas}
      >
        <S.PanWrapper style={{ transform: `translate(${pan.x}px, ${pan.y}px` }}>
          <S.Canvas
            ref={canvasRef}
            width={width}
            height={height}
            onMouseDown={onMouseDownPan}
            onMouseMove={onMouseMovePan}
            onMouseUp={onMouseUpPan}
            onKeyDown={registerHotKeys}
            isLoading={isLoading}
            tabIndex={0}
          />

          <Cursor size={1} coords={{ x: coords.x, y: coords.y }} />
        </S.PanWrapper>
      </S.ScaleWrapper>

      {isLoading && (
        <S.LoadingWrapper>
          <Loading />
        </S.LoadingWrapper>
      )}

      {!isLoading && (
        <>
          <S.BottomContainer>
            {!pallete && (
              <Menu
                handleDrawTile={drawTile}
                handlePallete={() => setPallete(true)}
                scale={scale}
                colorIndex={index}
              />
            )}
          </S.BottomContainer>

          <S.PalleteContainer>
            {pallete && (
              <Palette open={pallete} close={() => setPallete(false)} />
            )}
          </S.PalleteContainer>
        </>
      )}
    </>
  )
}
