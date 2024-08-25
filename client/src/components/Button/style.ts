import styled, { css } from "styled-components"
import { DefaultTheme } from "styled-components/dist/types"
import { ButtonProps } from "."

type WrapperProps = Pick<
  ButtonProps,
  "size" | "fullWidth" | "bold" | "backgroundColor"
>

export const wrapperModifiers = {
  small: (theme: DefaultTheme) => css`
    height: 3rem;
    font-size: ${theme.font.sizes.xsmall};
  `,
  medium: (theme: DefaultTheme) => css`
    height: 4rem;
    font-size: ${theme.font.sizes.small};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.medium};
  `,
  large: (theme: DefaultTheme) => css`
    height: 5rem;
    font-size: ${theme.font.sizes.large};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xlarge};
  `,
  fullWidth: () => css`
    width: 100%;
  `,
  bold: (theme: DefaultTheme) => css`
    font-weight: ${theme.font.bold};
  `,
  disabled: () => css`
    &:disabled {
      filter: saturate(60%);
    }
  `
}

export const Wrapper = styled.button<WrapperProps>`
  ${({ theme, size, bold, disabled, fullWidth, backgroundColor }) => css`
    cursor: pointer;
    border: 2px solid black;
    transition: 0.2s all ease-in-out;
    font-family: "Inter";
    margin-right: 1.4rem;
    background-color: ${backgroundColor};
    font-weight: ${theme.font.bold};

    &:hover {
      transform: scale(1.1, 1.1);
    }

    ${!!size && wrapperModifiers[size](theme)}
    ${!!bold && wrapperModifiers.bold(theme)}
    ${!!fullWidth && wrapperModifiers.fullWidth()}
    ${disabled && wrapperModifiers.disabled()}
  `}
`
