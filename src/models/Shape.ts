export interface ShapeConfig {
  color?: string;
  lineWidth: number;
}

export interface Shape {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  config: ShapeConfig;

  start(event: MouseEvent): void;
  draw(event: MouseEvent): void;
  end(event: MouseEvent): void;
}
