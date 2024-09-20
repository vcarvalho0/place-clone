import React from "react"
import isPropValid from "@emotion/is-prop-valid"
import Place from "./pages"
import theme from "./style/theme"
import { StyleSheetManager } from "styled-components"
import { GlobalStyle } from "./style"
import { PaletteProvider } from "./context/palette"
import { ThemeProvider } from "styled-components"

function App() {
  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <PaletteProvider>
          <Place />
        </PaletteProvider>
      </ThemeProvider>
    </StyleSheetManager>
  )
}

function shouldForwardProp(
  propname: string,
  target: string | React.ComponentType<unknown>
) {
  if (typeof target === "string") {
    return isPropValid(propname)
  }

  return true
}

export default App
