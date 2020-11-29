import "./App.css";

function App() {
  return (
    <div className="drawing-canvas-container">
      <div className="main">
        <canvas
          id="canvas-id"
          width="200"
          height="200"
          color="#EBEDED"
        ></canvas>
      </div>
      <div className="tools"></div>
    </div>
  );
}

export default App;
