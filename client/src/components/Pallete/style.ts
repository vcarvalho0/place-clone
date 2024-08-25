import styled, { css, keyframes } from "styled-components"

type ColorProps = {
  color: string
  colorSelected: boolean
}

const grow = keyframes`
  0% { transform: scale(1.3, 1.3)}
  50% { transform: scale(1.2, 1.2)}
  100% { transform: scale(1, 1)}
`

const collapseIn = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  } 

  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const collapseOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 0;
  } 

  to {
    transform: translateY(100%);
    opacity: 1;
  }
`

export const Colors = styled.div<ColorProps>`
  width: 2.2rem;
  height: 2.2rem;
  cursor: pointer;
  background-color: ${(props) => props.color};

  &:hover {
    opacity: 0.5;
  }

  ${({ colorSelected }) =>
    colorSelected &&
    css`
      animation: ${grow} 0.2s linear normal;
      border: 3px solid black;
      z-index: 1;
    `}
`

export const ColorWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const PalleteBar = styled.div<{ isCollapsing: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  height: 100%;
  border: 2px solid black;
  animation: ${(props) => (props.isCollapsing ? collapseIn : collapseOut)} 0.2s
    linear normal;
  z-index: 1;
`

export const PalleteButton = styled.button`
  cursor: pointer;
  border: 1px solid #fe4503;
  font-size: 1.4rem;
  padding: 0.1rem 2.3rem;
  border-radius: 0.5rem;
  margin: 0.4rem;
  color: #fe4503;

  &:hover {
    color: #ffffff;
    background-color: #fe4503;
  }
`
