import Button from "../Button"
import * as S from "./style"
import { MouseEvent } from "react"
import { pallete } from "@/utils/pallete"

type MenuProps = {
  handleDrawTile: (e: MouseEvent<HTMLButtonElement>) => void
  handlePallete: () => void
  colorIndex: number
  scale: number
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
  handleDrawTile,
  handlePallete,
  colorIndex,
  scale
}: MenuProps) {
  const getCurrentColor = (): string => {
    return pallete[colorIndex].hex || ""
  }

  return (
    <S.Container>
      <Button size="medium" onClick={handleDrawTile} backgroundColor="#FE4503">
        <S.Wrapper>
          <p>Place!</p>
          <S.Text>{scale.toString().concat("x")}</S.Text>
        </S.Wrapper>
      </Button>
      <Button
        size="small"
        onClick={handlePallete}
        backgroundColor={getCurrentColor()}
      >
        <ElipsisHorizontal />
      </Button>
    </S.Container>
  )
}
