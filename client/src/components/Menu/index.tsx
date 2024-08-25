import { PixelRGB } from "@/context/palette"
import Button from "../Button"
import * as S from "./style"

type MenuProps = {
  handlePlacePixel: (e: React.MouseEvent<HTMLButtonElement>) => void
  handleOpenPallete: () => void
  scaleLevel: number
  currentColor: PixelRGB
}

function ElipsisHorizontal() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ width: "2.6rem", height: "2.6rem" }}
    >
      <path
        fillRule="evenodd"
        d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function Menu({
  handlePlacePixel,
  handleOpenPallete,
  scaleLevel,
  currentColor
}: MenuProps) {
  const checkColor = () => {
    const color = currentColor
    if (color.r === 0 && color.g === 0 && color.b === 0) {
      return "rgb(255, 255, 255)"
    }
    return `rgb(${color.r}, ${color.g}, ${color.b})`
  }

  return (
    <S.Container>
      <Button
        size="medium"
        onClick={handlePlacePixel}
        backgroundColor="#FE4503"
      >
        <S.Wrapper>
          <p>Place!</p>
          <S.Text>{scaleLevel.toString().concat("x")}</S.Text>
        </S.Wrapper>
      </Button>
      <Button
        size="small"
        onClick={handleOpenPallete}
        backgroundColor={checkColor()}
      >
        <ElipsisHorizontal />
      </Button>
    </S.Container>
  )
}
