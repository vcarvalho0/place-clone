import styled from "styled-components"
import { css } from "styled-components"

export const InfoBar = styled.div`
  color: #ffffff;
  background-color: #ffffff;
  border-radius: 1rem;
  border: 0.1rem solid black;
  padding: 0.4rem;
`

export const InfoText = styled.p`
  ${({ theme }) => css`
    color: #000000;
    font-family: "Inter";
    text-align: center;
    font-size: ${theme.font.sizes.xsmall};
  `}
`
