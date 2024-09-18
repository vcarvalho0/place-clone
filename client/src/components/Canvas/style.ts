import styled, { css } from "styled-components"

type CanvasLoadingProps = {
  isLoading: boolean
}

export const TopContainer = styled.div`
  ${({ theme }) => css`
    position: fixed;
    top: 0;
    z-index: 1;
    margin: ${theme.spacings.xsmall};
  `}
`

export const BottomContainer = styled.div`
  ${({ theme }) => css`
    position: fixed;
    bottom: 0;
    z-index: 1;
    margin: ${theme.spacings.xsmall};
  `}
`

export const PalleteContainer = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1;
`

export const ScaleWrapper = styled.div``

export const PanWrapper = styled.div``

export const Canvas = styled.canvas<CanvasLoadingProps>`
  background-color: white;
  outline: none;
  visibility: ${(props) => (props.isLoading ? "hidden" : "visible")};
  opacity: ${(props) => (props.isLoading ? 0 : 1)};
  transition: opacity 0.3s ease;
`

export const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
