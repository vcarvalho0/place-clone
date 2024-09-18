import { useEffect, useState } from "react"
import * as S from "./style"
import { pallete } from "@/utils/pallete"

export default function Loading() {
  const [colorIndex, setColorIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % pallete.length)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <>
      <S.Square backgroundColor={pallete[colorIndex].hex} />
      <S.Text>Loading...</S.Text>
    </>
  )
}
