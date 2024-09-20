import { useEffect, useState } from "react"
import * as S from "./style"
import { palette } from "@/utils/palette"

export default function Loading() {
  const [colorIndex, setColorIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % palette.length)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <>
      <S.Square backgroundColor={palette[colorIndex].hex} />
      <S.Text>Loading...</S.Text>
    </>
  )
}
