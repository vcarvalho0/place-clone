import styled, { keyframes } from "styled-components"

type Square = {
  backgroundColor: string
}

const expand = keyframes`
  0%  { transform: scale(1, 1) }
  80% { transform: scale(1.4, 1.4) }
  100% { transform: scale(1, 1) }
`

export const Text = styled.p`
  font-family: "Silkscreen";
  color: white;
  font-size: 1.2rem;
`

export const Square = styled.div<Square>`
  width: 30px;
  height: 30px;
  background: ${(props) => props.backgroundColor};
  border: 3px solid black;
  margin-bottom: 15px;
  animation: ${expand} 1.5s infinite;
`
