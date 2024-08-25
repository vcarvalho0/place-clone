export type Position = {
  x: number
  y: number
}

export const calculateDistance = (pos1: Position, pos2: Position) => {
  const dx = pos2.x - pos1.x
  const dy = pos2.y - pos1.y
  return Math.abs(dx * dx + dy * dy)
}
