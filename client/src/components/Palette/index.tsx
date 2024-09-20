import { useState } from "react"
import { palette } from "@/utils/palette"
import { usePalette } from "@/context/palette"
import Tooltip from "../Tooltip"
import * as S from "./style"

type PalleteProps = {
  close: () => void
  open: boolean
}

export default function Pallete({ open, close }: PalleteProps) {
  const [colorType, setColorType] = useState("")
  const { getIndexFromHex } = usePalette()

  return (
    <S.PalleteBar isCollapsing={open}>
      <S.ColorWrapper>
        {palette.map((color, index) => {
          return (
            <Tooltip key={index} content={color.name}>
              <S.Colors
                color={color.hex}
                onClick={() => {
                  setColorType(color.name)
                  getIndexFromHex(color.hex)
                }}
                colorSelected={colorType === color.name}
              />
            </Tooltip>
          )
        })}
      </S.ColorWrapper>
      <S.PalleteButton onClick={close}>X</S.PalleteButton>
    </S.PalleteBar>
  )
}
