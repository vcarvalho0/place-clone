import styled, { css, keyframes } from "styled-components"

const expand = keyframes`
  0%  { transform: scale(1, 1)   }
  30% { transform: scale(1, 1.3) }
  60% { transform: scale(1.3, 1) }
  90% { transform: scale(1, 1)   }
`

export const Tooltip = styled.div`
  ${({ theme }) => css`
    max-width: 100%;
    font-size: 0.9rem;
    font-weight: ${theme.font.normal};
    background-color: ${theme.colors.white};
    text-align: center;
    padding: 0.3rem;
    border-radius: 0.4rem;
    border: 1px solid #d8e2e2;
    position: absolute;
    top: -30px;
    visibility: hidden;
    z-index: 1;
  `}
`

export const TooltipContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover ${Tooltip} {
    animation: ${expand} 0.2s linear normal;
    visibility: visible;
  }
`

export const TooltipArrow = styled.div`
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 12px solid #fff;
  position: absolute;
  bottom: -10px;
  left: calc(50% - 12px);
`

export const TooltipText = styled.p``
