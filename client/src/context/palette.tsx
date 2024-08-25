import { createContext, ReactNode, useContext, useState } from "react"
import { Color } from "@/utils/pallete"

export type PixelRGB = {
  r: number
  g: number
  b: number
}

type PalleteContextType = {
  color: PixelRGB
  getColor: (pallete: Color) => void
}

type PalleteProviderProps = {
  children: ReactNode | ReactNode[]
}

const PalleteContext = createContext<PalleteContextType | null>(null)

export const PalleteProvider = ({ children }: PalleteProviderProps) => {
  const [color, setColor] = useState<PixelRGB>({ r: 0, g: 0, b: 0 })

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return { r, g, b }
  }

  const getColor = (pallete: Color) => {
    const rgb = hexToRgb(pallete.hex)
    setColor(rgb)
  }

  return (
    <PalleteContext.Provider value={{ color, getColor }}>
      {children}
    </PalleteContext.Provider>
  )
}

export const usePallete = () => {
  const context = useContext(PalleteContext)

  if (!context) {
    throw new Error("You're not using usePallete provider")
  }

  return context
}
