import styled, { css } from "styled-components"

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  image-rendering: pixelated;
`

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

export const Wrapper = styled.div``

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

export const Canvas = styled.canvas`
  background-color: white;
`
