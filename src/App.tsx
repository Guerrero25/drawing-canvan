import { useEffect, useRef, useState } from "react";

import Canvas from "./components/Canvas";
import ShapeSelect, { ShapeSelectOption } from "./components/ShapeSelect";

import { Shape } from "./models/Shape";
import { ShapeFactory, ShapeOptions } from "./models";

import square from "./assets/icons/square.svg";
import line from "./assets/icons/diagonal-line.svg";
import squareFilled from "./assets/icons/square_filled.svg";
import pencil from "./assets/icons/pencil.svg";

import "./App.css";

const options: ShapeSelectOption[] = [
  {
    label: "Pencil",
    value: "pencil",
    imageSrc: pencil,
  },
  {
    label: "Line",
    value: "line",
    imageSrc: line,
  },
  {
    label: "Square",
    value: "square",
    imageSrc: square,
  },
  {
    label: "Square filled",
    value: "square_filled",
    imageSrc: squareFilled,
  },
];

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const shapeInstance = useRef<Shape | null>(null);
  const [canvasSize, setCanvasSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [selectedShape, setSelectedShape] = useState<ShapeOptions>("pencil");

  useEffect(() => {
    setCanvasSize({
      width: mainRef.current?.offsetWidth || 100,
      height: mainRef.current?.offsetHeight || 100,
    });
  }, []);

  return (
    <div className="drawing-canvas-container">
      <div className="main" ref={mainRef}>
        <Canvas
          id="drawing-board"
          width={canvasSize?.width}
          height={canvasSize?.height}
          onStartDrawing={(ctx, e) => {
            shapeInstance.current = ShapeFactory.createShape(
              selectedShape,
              ctx,
              {
                lineWidth: 1,
              }
            );

            shapeInstance.current.start(e);
          }}
          onMoveDrawing={(ctx, e) => {
            shapeInstance.current?.draw(e);
          }}
          onEndDrawing={(ctx, e) => {
            shapeInstance.current?.end(e);

            shapeInstance.current = null;
          }}
        />
      </div>
      <div className="tools">
        <ShapeSelect
          selected={selectedShape}
          options={options}
          onSelect={setSelectedShape}
        />
      </div>
    </div>
  );
}

export default App;
