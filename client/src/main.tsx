import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"

/*
  const onMouseDownPan = (evt: React.MouseEvent) => {
    const { clientX, clientY } = getMousePosition(evt)
    setIsPanning(true)
    setStartPanPosition({ x: clientX, y: clientY })
  }

  const onMouseMovePan = (evt: React.MouseEvent) => {
    if (isPanning) {
      const { clientX, clientY } = getMousePosition(evt)

      const offsetX = clientX - startPanPosition.x + pan.x
      const offsetY = clientY - startPanPosition.y + pan.y

      setPan({ x: offsetX, y: offsetY })
    }
  }

  const onMouseUpPan = () => {
    setIsPanning(false)
  }
*/

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
