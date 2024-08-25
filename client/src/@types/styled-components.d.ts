import "styled-components"

import Theme from "@/style/theme"

type Theme = typeof Theme

declare module "styled-components" {
  // eslint-disable-next-line prettier/prettier
  export interface DefaultTheme extends Theme { }
}
