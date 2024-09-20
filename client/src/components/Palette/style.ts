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

export const Colors = styled.div<ColorProps>`
  width: 2.2rem;
  height: 2.2rem;
  cursor: pointer;
  margin: 2.6px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
  flex-wrap: wrap;
  justify-content: center;
  max-width: 35%;

  @media (max-width: 1440px) {
    max-width: 45%;
  }

  @media (max-width: 1024px) {
    max-width: 65%;
  }

  @media (max-width: 768px) {
    max-width: 75%;
  }
`

export const PalleteBar = styled.div<{ isCollapsing: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  border: 2px solid black;
  animation: ${(props) => (props.isCollapsing ? collapseIn : "")} 0.2s linear
    normal;
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
