import { createContext, ReactNode, useContext, useState } from "react"
import { pallete } from "@/utils/pallete"

type PalleteContextType = {
  index: number
  getIndexFromHex: (hex: string) => void
}

type PalleteProviderProps = {
  children: ReactNode | ReactNode[]
}

const PalleteContext = createContext<PalleteContextType | null>(null)

export const PalleteProvider = ({ children }: PalleteProviderProps) => {
  const [index, setIndex] = useState<number>(14)

  const getIndexFromHex = (hex: string) => {
    const colorIndex = pallete.findIndex((color) => color.hex === hex)
    setIndex(colorIndex)
  }

  return (
    <PalleteContext.Provider value={{ index, getIndexFromHex }}>
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
