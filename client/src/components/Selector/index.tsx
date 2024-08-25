import * as S from "./style"

export type PixelSelectorProps = {
  pixelSize: number
}

export default function Selector({ pixelSize }: PixelSelectorProps) {
  return <S.SelectTool pixelSize={pixelSize} />
}
