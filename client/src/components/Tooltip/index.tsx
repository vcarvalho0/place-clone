import { ReactNode } from "react"
import * as S from "./style"

export type ToolTipProps = {
  content: string
  children: ReactNode
}

export default function Tooltip({ content, children }: ToolTipProps) {
  return (
    <S.TooltipContainer>
      {children}
      <S.Tooltip>
        {content}
        <S.TooltipArrow />
      </S.Tooltip>
    </S.TooltipContainer>
  )
}
