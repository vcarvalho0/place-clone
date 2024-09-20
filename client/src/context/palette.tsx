import { createContext, ReactNode, useContext, useState } from "react"
import { palette } from "@/utils/palette"

type PaletteContextType = {
  index: number
  getIndexFromHex: (hex: string) => void
}

type PaletteProviderProps = {
  children: ReactNode | ReactNode[]
}

const PaletteContext = createContext<PaletteContextType | null>(null)

export const PaletteProvider = ({ children }: PaletteProviderProps) => {
  const [index, setIndex] = useState<number>(29)

  const getIndexFromHex = (hex: string) => {
    const colorIndex = palette.findIndex((color) => color.hex === hex)
    setIndex(colorIndex)
  }

  return (
    <PaletteContext.Provider value={{ index, getIndexFromHex }}>
      {children}
    </PaletteContext.Provider>
  )
}

export const usePalette = () => {
  const context = useContext(PaletteContext)

  if (!context) {
    throw new Error("You're not using usePallete provider")
  }

  return context
}
