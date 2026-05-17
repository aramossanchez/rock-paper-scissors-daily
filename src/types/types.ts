export interface Item {
  x: number;
  y: number;
  movementX: number;
  movementY: number;
}

export type ArrowClasses =
  | "arrow-top-left"
  | "arrow-top-right"
  | "arrow-bottom-left"
  | "arrow-bottom-right";

export interface ModalInfo {
  winner: "ROCK" | "PAPER" | "SCISSORS" | null;
  winnerSurvivalItems: number | null;
  firstLoser: "ROCK" | "PAPER" | "SCISSORS" | null;
  firstLoserTime: number | null;
  secondLoser: "ROCK" | "PAPER" | "SCISSORS" | null;
  totalTime: number | null;
}
