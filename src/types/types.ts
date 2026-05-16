export interface Item {
  x: number | null;
  y: number | null;
  movementX: number;
  movementY: number;
}

export type ArrowClasses =
  | "arrow-top-left"
  | "arrow-top-right"
  | "arrow-bottom-left"
  | "arrow-bottom-right";
