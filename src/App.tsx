import Canvas from "./components/Canvas";

import "./App.css";

let x = 0;
let y = 0;

function App() {
  return (
    <div className="drawing-canvas-container">
      <div className="main">
        <Canvas
          id="drawing-board"
          width="100%"
          height="100%"
          onStartDrawing={(ctx, e) => {
            x = e.offsetX;
            y = e.offsetY;
          }}
          onMoveDrawing={(ctx, e) => {
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.moveTo(x, y);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            ctx.closePath();

            x = e.offsetX;
            y = e.offsetY;
          }}
          onEndDrawing={(ctx, e) => {
            x = 0;
            y = 0;
          }}
        />
      </div>
      <div className="tools"></div>
    </div>
  );
}

export default App;
