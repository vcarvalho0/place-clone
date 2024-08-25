import styled from "styled-components"
import { PixelSelectorProps } from "."

export const SelectTool = styled.div<PixelSelectorProps>`
  position: absolute;
  width: ${(props) => props.pixelSize}px;
  height: ${(props) => props.pixelSize}px;
  top: 0;
  left: 0;
  border: 1px solid #000000;
`
