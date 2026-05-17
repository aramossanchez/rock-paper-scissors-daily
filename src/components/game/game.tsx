import "./game.css";
import {
  collisionDetectionBetweenSameElements,
  collisionDetectionBetweenWinnerAndLoser,
  collisionDetectionWithWalls,
} from "./utils/collisions";
import type { ArrowClasses, Item, ModalInfo } from "../../types/types";
import { playEndgameSound } from "../../utils/executeSounds";

interface Props {
  speed: number;
  iconRadius: number;
  rock: number;
  paper: number;
  scissor: number;
  eliminate?: boolean;
  replace?: boolean;
  setScissorsNumber: React.Dispatch<React.SetStateAction<number>>;
  setPapersNumber: React.Dispatch<React.SetStateAction<number>>;
  setRocksNumber: React.Dispatch<React.SetStateAction<number>>;
  setClock: React.Dispatch<React.SetStateAction<number>>;
  rockArrowClass: ArrowClasses | null;
  paperArrowClass: ArrowClasses | null;
  scissorsArrowClass: ArrowClasses | null;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalInfo: React.Dispatch<React.SetStateAction<ModalInfo>>;
  gameReady: boolean;
}

export default function GameComponent({
  speed,
  iconRadius,
  rock,
  paper,
  scissor,
  eliminate,
  replace,
  setScissorsNumber,
  setPapersNumber,
  setRocksNumber,
  setClock,
  rockArrowClass,
  paperArrowClass,
  scissorsArrowClass,
  setShowModal,
  setModalInfo,
  gameReady,
}: Props) {
  const canvas = document.getElementById("game") as HTMLCanvasElement;
  let internalClockInterval: number;
  let externalClockInterval: number;
  let movementInterval: number;

  let internalClock = 0;

  const dataModalInfo: ModalInfo = {
    winner: null,
    winnerSurvivalItems: null,
    firstLoser: null,
    firstLoserTime: null,
    secondLoser: null,
    totalTime: null,
  };

  const scissorsImage = new Image();
  const scissorsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
  <path fill="#ff9c9c" d="M288 64C305.7 64 320 78.3 320 96L320 304L256 304L256 96C256 78.3 270.3 64 288 64zM384 224C401.7 224 416 238.3 416 256L416 320C416 337.7 401.7 352 384 352C366.3 352 352 337.7 352 320L352 256C352 238.3 366.3 224 384 224zM448 288C448 270.3 462.3 256 480 256C497.7 256 512 270.3 512 288L512 352C512 369.7 497.7 384 480 384C462.3 384 448 369.7 448 352L448 288zM157.3 115.2L239.9 304L170.1 304L98.7 140.8C91.6 124.6 99 105.8 115.2 98.7C131.4 91.6 150.2 99 157.3 115.2zM184.3 336.5L184.1 336L280 336C302.1 336 320 353.9 320 376C320 398.1 302.1 416 280 416L224 416C215.2 416 208 423.2 208 432C208 440.8 215.2 448 224 448L280 448C319.8 448 352 415.8 352 376L352 375.4C361.4 380.8 372.3 384 384 384C397.2 384 409.4 380 419.6 373.2C428.3 398.1 452.1 416 480 416C491.7 416 502.6 412.9 512 407.4L512 416C512 504.4 440.4 576 352 576L290.3 576C247.9 576 207.2 559.1 177.2 529.1L165.5 517.5C141.5 493.5 128 460.9 128 427L128 400C128 367.3 152.6 340.3 184.3 336.5z"/>
  </svg>`;
  const scissorsBlob = new Blob([scissorsSvg], { type: "image/svg+xml" });
  scissorsImage.src = URL.createObjectURL(scissorsBlob);

  const paperImage = new Image();
  const paperSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
  <path fill="white" d="M352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 304C288 312.8 280.8 320 272 320C263.2 320 256 312.8 256 304L256 128C256 110.3 241.7 96 224 96C206.3 96 192 110.3 192 128L192 400C192 401.5 192 403.1 192.1 404.6L131.6 347C115.6 331.8 90.3 332.4 75 348.4C59.7 364.4 60.4 389.7 76.4 405L188.8 512C231.9 553.1 289.2 576 348.8 576L368 576C465.2 576 544 497.2 544 400L544 192C544 174.3 529.7 160 512 160C494.3 160 480 174.3 480 192L480 304C480 312.8 472.8 320 464 320C455.2 320 448 312.8 448 304L448 128C448 110.3 433.7 96 416 96C398.3 96 384 110.3 384 128L384 304C384 312.8 376.8 320 368 320C359.2 320 352 312.8 352 304L352 96z"/>
  </svg>`;
  const paperBlob = new Blob([paperSvg], { type: "image/svg+xml" });
  paperImage.src = URL.createObjectURL(paperBlob);

  const rockImage = new Image();
  const rockSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
  <path fill="#0081cc" d="M288 64C305.7 64 320 78.3 320 96L320 208L256 208L256 96C256 78.3 270.3 64 288 64zM160 128C160 110.3 174.3 96 192 96C209.7 96 224 110.3 224 128L224 208L160 208L160 128zM352 128C352 110.3 366.3 96 384 96C401.7 96 416 110.3 416 128L416 224C416 241.7 401.7 256 384 256C366.3 256 352 241.7 352 224L352 128zM448 192C448 174.3 462.3 160 480 160C497.7 160 512 174.3 512 192L512 256C512 273.7 497.7 288 480 288C462.3 288 448 273.7 448 256L448 192zM352 280L352 279.4C361.4 284.8 372.3 288 384 288C397.2 288 409.4 284 419.6 277.2C428.3 302.1 452.1 320 480 320C491.7 320 502.6 316.9 512 311.4L512 320C512 372.3 486.9 418.8 448 448L448 544C448 561.7 433.7 576 416 576L256 576C238.3 576 224 561.7 224 544L224 465.6C206.7 457.7 190.8 446.8 177.1 433.1L165.5 421.5C141.5 397.5 128 364.9 128 331L128 304C128 268.7 156.7 240 192 240L280 240C302.1 240 320 257.9 320 280C320 302.1 302.1 320 280 320L224 320C215.2 320 208 327.2 208 336C208 344.8 215.2 352 224 352L280 352C319.8 352 352 319.8 352 280z"/>
  </svg>`;
  const rockBlob = new Blob([rockSvg], { type: "image/svg+xml" });
  rockImage.src = URL.createObjectURL(rockBlob);

  if (
    canvas &&
    gameReady &&
    rockArrowClass &&
    paperArrowClass &&
    scissorsArrowClass
  ) {
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const arrowClasses = {
      "arrow-top-left": {
        xCoordinate: iconRadius * 2,
        yCoordinate: iconRadius * 2,
      },
      "arrow-top-right": {
        xCoordinate: canvas.width - iconRadius * 2,
        yCoordinate: iconRadius * 2,
      },
      "arrow-bottom-left": {
        xCoordinate: iconRadius * 2,
        yCoordinate: canvas.height - iconRadius * 2,
      },
      "arrow-bottom-right": {
        xCoordinate: canvas.width - iconRadius * 2,
        yCoordinate: canvas.height - iconRadius * 2,
      },
    } as const;

    const rocks: Item[] = [];
    for (let i = 0; i < rock; i++) {
      const xCoordinate = arrowClasses[rockArrowClass].xCoordinate;
      const yCoordinate = arrowClasses[rockArrowClass].yCoordinate;
      const angle = Math.random() * 360;
      const radians = angle * (Math.PI / 180);
      rocks.push({
        x: xCoordinate,
        y: yCoordinate,
        movementX: Math.cos(radians) * speed,
        movementY: Math.sin(radians) * speed,
      });
    }

    const papers: Item[] = [];
    for (let i = 0; i < paper; i++) {
      const xCoordinate = arrowClasses[paperArrowClass].xCoordinate;
      const yCoordinate = arrowClasses[paperArrowClass].yCoordinate;
      const angle = Math.random() * 360;
      const radians = angle * (Math.PI / 180);
      papers.push({
        x: xCoordinate,
        y: yCoordinate,
        movementX: Math.cos(radians) * speed,
        movementY: Math.sin(radians) * speed,
      });
    }

    const scissors: Item[] = [];
    for (let i = 0; i < scissor; i++) {
      const xCoordinate = arrowClasses[scissorsArrowClass].xCoordinate;
      const yCoordinate = arrowClasses[scissorsArrowClass].yCoordinate;
      const angle = Math.random() * 360;
      const radians = angle * (Math.PI / 180);
      scissors.push({
        x: xCoordinate,
        y: yCoordinate,
        movementX: Math.cos(radians) * speed,
        movementY: Math.sin(radians) * speed,
      });
    }

    const drawItems = (
      array: Item[],
      image: HTMLImageElement,
      strokeColor: string,
    ) => {
      for (let i = 0; i < array.length; i++) {
        const item = array[i];
        ctx.beginPath();
        ctx.arc(item.x, item.y, iconRadius + 2, 0, Math.PI * 2);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
        ctx.drawImage(
          image,
          item.x - iconRadius,
          item.y - iconRadius,
          iconRadius * 2,
          iconRadius * 2,
        );
      }
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawItems(rocks, rockImage, "#0081cc");
      drawItems(papers, paperImage, "#ffffff");
      drawItems(scissors, scissorsImage, "#ff9c9c");
    };

    function startMovement() {
      draw();
      // ROCK COLLISIONS
      collisionDetectionWithWalls(rocks, iconRadius, canvas);
      collisionDetectionBetweenSameElements(rocks, iconRadius, speed);
      collisionDetectionBetweenWinnerAndLoser(
        rocks,
        scissors,
        iconRadius,
        replace,
        eliminate,
        setRocksNumber,
        setScissorsNumber,
      );
      // PAPER COLLISIONS
      collisionDetectionWithWalls(papers, iconRadius, canvas);
      collisionDetectionBetweenSameElements(papers, iconRadius, speed);
      collisionDetectionBetweenWinnerAndLoser(
        papers,
        rocks,
        iconRadius,
        replace,
        eliminate,
        setPapersNumber,
        setRocksNumber,
      );
      // SCISSORS COLLISIONS
      collisionDetectionWithWalls(scissors, iconRadius, canvas);
      collisionDetectionBetweenSameElements(scissors, iconRadius, speed);
      collisionDetectionBetweenWinnerAndLoser(
        scissors,
        papers,
        iconRadius,
        replace,
        eliminate,
        setScissorsNumber,
        setPapersNumber,
      );

      if (
        (rocks.length === 0 || papers.length === 0 || scissors.length === 0) &&
        dataModalInfo.firstLoser === null
      ) {
        dataModalInfo.firstLoser =
          rocks.length === 0
            ? "ROCK"
            : papers.length === 0
              ? "PAPER"
              : "SCISSORS";
        dataModalInfo.firstLoserTime = internalClock;
      }

      if (
        ((rocks.length === 0 && papers.length === 0) ||
          (rocks.length === 0 && scissors.length === 0) ||
          (papers.length === 0 && scissors.length === 0)) &&
        dataModalInfo.winner === null
      ) {
        dataModalInfo.winner =
          rocks.length > 0 ? "ROCK" : papers.length > 0 ? "PAPER" : "SCISSORS";
        dataModalInfo.winnerSurvivalItems =
          rocks.length + papers.length + scissors.length;
        dataModalInfo.secondLoser =
          rocks.length === 0
            ? papers.length === 0
              ? "PAPER"
              : "ROCK"
            : papers.length === 0
              ? "SCISSORS"
              : "PAPER";
        dataModalInfo.totalTime = internalClock;

        setModalInfo(dataModalInfo);
        clearInterval(movementInterval);
        clearInterval(internalClockInterval);
        clearInterval(externalClockInterval);
        setShowModal(true);
        playEndgameSound();
      }
    }

    function startGame() {
      // ejecutar el sonido que tengo en assets cuando se presiona el boton de start

      movementInterval = setInterval(startMovement, 10);
      internalClockInterval = setInterval(() => {
        internalClock += 1;
      }, 1000);
      externalClockInterval = setInterval(() => {
        setClock(internalClock);
      }, 1000);
    }

    const startButton: HTMLButtonElement | null = document.getElementById(
      "startButton",
    ) as HTMLButtonElement;
    startButton.addEventListener("click", () => {
      startGame();
      startButton.disabled = true;
    });
  }

  return <canvas id="game" className="game" width="500" height="500"></canvas>;
}
