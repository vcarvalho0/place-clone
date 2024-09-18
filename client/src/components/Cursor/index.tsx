import { Position } from "@/utils/math"

export type CursorProps = {
  size: number
  coords: Position
}

function CursorSVG({ size, coords }: CursorProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        transform: `translate(${coords.x}px, ${coords.y}px)`,
        top: 0,
        left: 0,
        pointerEvents: "none"
      }}
    >
      <rect y="7" width="4" height="2" fill="#3C3C3C" />
      <rect y="5" width="2" height="3" fill="#3C3C3C" />
      <rect
        width="4.04581"
        height="2.01672"
        transform="matrix(-0.00362219 0.999993 -0.999994 -0.00358664 2.03059 0.00723267)"
        fill="#3C3C3C"
      />
      <rect
        width="1.98278"
        height="2.74953"
        transform="matrix(-0.00362219 0.999993 -0.999994 -0.00358664 4.04894 0.014473)"
        fill="#3C3C3C"
      />
      <rect
        width="3.96724"
        height="1.92411"
        transform="matrix(-0.00143974 -0.999999 0.999999 -0.00142561 7.08018 8.95723)"
        fill="#3C3C3C"
      />
      <rect
        width="1.94732"
        height="2.57108"
        transform="matrix(-0.00143974 -0.999999 0.999999 -0.00142561 5.144 8.95998)"
        fill="#3C3C3C"
      />
      <rect
        width="3.94121"
        height="1.99344"
        transform="matrix(-1 -0.000404301 0.00040831 -1 8.99848 1.995)"
        fill="#3C3C3C"
      />
      <rect
        width="1.99287"
        height="2.73644"
        transform="matrix(-1 -0.000404301 0.00040831 -1 8.99765 4.01721)"
        fill="#3C3C3C"
      />
    </svg>
  )
}

export default function Cursor({ size, coords }: CursorProps) {
  return <CursorSVG size={size} coords={{ x: coords.x, y: coords.y }} />
}
