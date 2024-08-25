import { Position } from "@/utils/math"
import * as S from "./style"

type InfoProps = {
  coords: Position
}

export default function Info({ coords }: InfoProps) {
  const coordinates = {
    x: coords.x,
    y: coords.y
  }

  const formatCoordinates = Object.values(coordinates).join(",")

  return (
    <S.InfoBar>
      <S.InfoText>{formatCoordinates}</S.InfoText>
    </S.InfoBar>
  )
}
