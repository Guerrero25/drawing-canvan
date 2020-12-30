import { Square } from "./Square";

export class SquareFilled extends Square {
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
    this.ctx.fill();
  }
}
