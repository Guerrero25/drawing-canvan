import { useCallback, useEffect, useRef } from "react";

import "./style.css";

interface CanvasProps {
  id: string;
  width?: number | string;
  height?: number | string;
  onStartDrawing: (ctx: any, e: MouseEvent) => void;
  onMoveDrawing: (ctx: any, e: MouseEvent) => void;
  onEndDrawing: (ctx: any, e: MouseEvent) => void;
}

function Canvas({
  id,
  height,
  width,
  onStartDrawing,
  onMoveDrawing,
  onEndDrawing,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const ctx = canvasRef.current?.getContext("2d");

      if (isDrawingRef.current) {
        onMoveDrawing(ctx, e);
      }
    },
    [onMoveDrawing]
  );

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      const ctx = canvasRef.current?.getContext("2d");

      onEndDrawing(ctx, e);
      isDrawingRef.current = false;
    },
    [onEndDrawing]
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      const ctx = canvasRef.current?.getContext("2d");

      onStartDrawing(ctx, e);
      isDrawingRef.current = true;
    },
    [onStartDrawing]
  );

  useEffect(() => {
    removeListeners();

    canvasRef.current?.addEventListener("mousedown", handleMouseDown);
    canvasRef.current?.addEventListener("mousemove", handleMouseMove);
    canvasRef.current?.addEventListener("mouseup", handleMouseUp);

    return () => {
      removeListeners();
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  return (
    <canvas
      className="canvas"
      ref={canvasRef}
      id={id}
      width={width}
      height={height}
      style={{
        width,
        height,
      }}
    ></canvas>
  );

  function removeListeners() {
    canvasRef.current?.removeEventListener("mousedown", handleMouseDown);
    canvasRef.current?.removeEventListener("mousemove", handleMouseMove);
    canvasRef.current?.removeEventListener("mouseup", handleMouseUp);
  }
}

export default Canvas;
