import { render, fireEvent } from "@testing-library/react";
import Canvas from ".";

describe("Canvas component", () => {
  it("renders the canvas tag element", () => {
    const { container } = render(<Canvas id="testing-canvas" />);

    const canvasElement = container.querySelector("canvas#testing-canvas");

    expect(canvasElement).toBeInTheDocument();
  });

  it("renders the canvas tag element with the width and height properties", () => {
    const { container } = render(
      <Canvas id="testing-canvas" width={400} height={400} />
    );

    const canvasElement = container.querySelector("canvas#testing-canvas");

    expect(canvasElement.getAttribute("width")).toEqual("400");
    expect(canvasElement.getAttribute("height")).toEqual("400");
  });

  it("should call onStartDrawing, onMoveDrawing and onEndDrawing", () => {
    const onStartDrawing = jest.fn();
    const onMoveDrawing = jest.fn();
    const onEndDrawing = jest.fn();
    const { container } = render(
      <Canvas
        id="testing-canvas"
        width={400}
        height={400}
        onStartDrawing={onStartDrawing}
        onMoveDrawing={onMoveDrawing}
        onEndDrawing={onEndDrawing}
      />
    );

    const canvasElement = container.querySelector("canvas#testing-canvas");
    const canvasCtx = canvasElement?.getContext("2d");
    const mockEvent = new MouseEvent("");

    fireEvent.mouseDown(canvasElement);
    expect(onStartDrawing).toBeCalledWith(canvasCtx, mockEvent);

    fireEvent.mouseMove(canvasElement);
    expect(onMoveDrawing).toBeCalledWith(canvasCtx, mockEvent);

    fireEvent.mouseUp(canvasElement);
    expect(onEndDrawing).toBeCalledWith(canvasCtx, mockEvent);
  });

  it("should call onMoveDrawing only when it has not called onEndDrawing", () => {
    const onStartDrawing = jest.fn();
    const onMoveDrawing = jest.fn();
    const onEndDrawing = jest.fn();
    const { container } = render(
      <Canvas
        id="testing-canvas"
        width={400}
        height={400}
        onStartDrawing={onStartDrawing}
        onMoveDrawing={onMoveDrawing}
        onEndDrawing={onEndDrawing}
      />
    );

    const canvasElement = container.querySelector("canvas#testing-canvas");

    fireEvent.mouseMove(canvasElement);
    fireEvent.mouseDown(canvasElement);
    fireEvent.mouseMove(canvasElement);
    fireEvent.mouseMove(canvasElement);
    fireEvent.mouseUp(canvasElement);
    fireEvent.mouseMove(canvasElement);

    expect(onMoveDrawing).toBeCalledTimes(2);
  });
});
