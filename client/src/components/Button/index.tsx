import { ButtonHTMLAttributes } from "react"
import * as S from "./style"

type ButtonTypes = ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = {
  size: "small" | "medium" | "large"
  fullWidth?: boolean
  bold?: boolean
  backgroundColor: string
  as?: React.ElementType
} & ButtonTypes

export default function Button({
  children,
  size = "medium",
  fullWidth = false,
  bold = false,
  ...props
}: ButtonProps) {
  return (
    <S.Wrapper size={size} bold={bold} fullWidth={fullWidth} {...props}>
      {!!children && <span>{children}</span>}
    </S.Wrapper>
  )
}
