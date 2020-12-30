import { Shape, ShapeConfig } from "./Shape";

import { Line } from "./Line";
import { Square } from "./Square";
import { Pencil } from "./Pencil";
import { SquareFilled } from "./SquareFilled";

export type ShapeOptions = "line" | "square" | "square_filled" | "pencil";

export class ShapeFactory {
  static createShape(
    shape: ShapeOptions,
    ctx: CanvasRenderingContext2D,
    config: ShapeConfig
  ): Shape {
    switch (shape) {
      case "pencil": {
        return new Pencil(ctx, config);
      }

      case "line": {
        return new Line(ctx, config);
      }

      case "square": {
        return new Square(ctx, config);
      }

      case "square_filled": {
        return new SquareFilled(ctx, config);
      }

      default:
        return new Pencil(ctx, config);
    }
  }
}
