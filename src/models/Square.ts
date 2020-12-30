import { Shape, ShapeConfig } from "./Shape";

export class Square implements Shape {
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

    this.ctx.rect(
      this.x,
      this.y,
      event.offsetX - this.x,
      event.offsetY - this.y
    );

    this.ctx.closePath();
    this.ctx.stroke();
  }
}
