import { Shape, ShapeConfig } from "./Shape";

export class Line implements Shape {
  x = 0;
  y = 0;
  ctx: CanvasRenderingContext2D;
  config: ShapeConfig;

  constructor(ctx: CanvasRenderingContext2D, config: ShapeConfig) {
    this.ctx = ctx;
    this.config = config;
  }

  start(event: MouseEvent) {
    this.x = event.offsetX;
    this.y = event.offsetY;
  }

  draw(event: MouseEvent) {}

  end(event: MouseEvent) {
    this.ctx.beginPath();

    this.ctx.strokeStyle = this.config.color || "black";
    this.ctx.lineWidth = this.config.lineWidth || 1;

    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(event.offsetX, event.offsetY);
    this.ctx.stroke();

    this.ctx.closePath();
  }
}
