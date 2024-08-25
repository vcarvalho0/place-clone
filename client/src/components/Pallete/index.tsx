import { useState } from "react"
import { pallete } from "@/utils/pallete"
import { usePallete } from "@/context/palette"
import Tooltip from "../Tooltip"
import * as S from "./style"

type PalleteProps = {
  closePallete: () => void
  openPallete: boolean
}

export default function Pallete({ openPallete, closePallete }: PalleteProps) {
  const [colorType, setColorType] = useState("")
  const { getColor } = usePallete()

  return (
    <S.PalleteBar isCollapsing={openPallete}>
      <S.ColorWrapper>
        {pallete.map((color, index) => {
          return (
            <Tooltip key={index} content={color.name}>
              <S.Colors
                color={color.hex}
                onClick={() => {
                  setColorType(color.name)
                  getColor(color)
                }}
                colorSelected={colorType === color.name}
              />
            </Tooltip>
          )
        })}
      </S.ColorWrapper>
      <S.PalleteButton onClick={closePallete}>X</S.PalleteButton>
    </S.PalleteBar>
  )
}
