import { useState } from "react";
import GameComponent from "../../components/game/game";
import "./home.css";
import UpIcon from "../../icons/up";
import DownIcon from "../../icons/down";
import ArrowDownIcon from "../../icons/arrow-down";
import type { ArrowClasses } from "../../types/types";
import ModalComponent from "../../components/modal/modal";
import { ARROW_CLASSES } from "../../constants/constants";

export default function HomeContainer() {
  const [speed, setSpeed] = useState(2);
  const [radius, setRadius] = useState(15);
  const [rocksNumber, setRocksNumber] = useState(10);
  const [papersNumber, setPapersNumber] = useState(10);
  const [scissorsNumber, setScissorsNumber] = useState(10);
  const [eliminate, setEliminate] = useState(true);
  const [replace, setReplace] = useState(false);
  const [externalClock, setExternalClock] = useState<number>(0);
  const [rockArrowClass, setRockArrowClass] = useState<
    ArrowClasses | "arrow-hidden"
  >("arrow-hidden");
  const [paperArrowClass, setPaperArrowClass] = useState<
    ArrowClasses | "arrow-hidden"
  >("arrow-hidden");
  const [scissorsArrowClass, setScissorsArrowClass] = useState<
    ArrowClasses | "arrow-hidden"
  >("arrow-hidden");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState({
    winner: null,
    winnerSurvivalItems: null,
    firstLoser: null,
    firstLoserTime: null,
    secondLoser: null,
    totalTime: null,
  });
  const [gameReady, setGameReady] = useState<boolean>(false);
  const [needToHideArrows, setNeedToHideArrows] = useState<boolean>(false);

  const selectItemsStartingPoint = () => {
    const rockStartingPoint = Math.trunc(Math.random() * (4 - 0) + 0);
    let paperStartingPoint = Math.trunc(Math.random() * (4 - 0) + 0);
    while (paperStartingPoint === rockStartingPoint) {
      paperStartingPoint = Math.trunc(Math.random() * (4 - 0) + 0);
    }
    let scissorsStartingPoint = Math.trunc(Math.random() * (4 - 0) + 0);
    while (
      scissorsStartingPoint === rockStartingPoint ||
      scissorsStartingPoint === paperStartingPoint
    ) {
      scissorsStartingPoint = Math.trunc(Math.random() * (4 - 0) + 0);
    }

    setRockArrowClass(ARROW_CLASSES[rockStartingPoint]);
    setPaperArrowClass(ARROW_CLASSES[paperStartingPoint]);
    setScissorsArrowClass(ARROW_CLASSES[scissorsStartingPoint]);
    setGameReady(true);
  };

  return (
    <main className="home">
      {showModal && (
        <ModalComponent>
          <p>RESUME OF THE GAME</p>
          <div>
            <p>WINNER: {modalInfo.winner}</p>
            <p>Survival items: {modalInfo.winnerSurvivalItems}</p>
          </div>
          <div>
            <p>First looser: {modalInfo.firstLoser}</p>
            <p>Time to lose: {modalInfo.firstLoserTime}</p>
          </div>
          <div>
            <p>Second looser: {modalInfo.secondLoser}</p>
          </div>
          <p>Total time: {modalInfo.totalTime}</p>
        </ModalComponent>
      )}
      <p className="title-app">ROCK - PAPER - SCISSORS</p>
      <p className="instagram-follow">
        Follow in Instagram in <strong>@rock_paper_scissors_daily</strong>
      </p>
      <div className="values-container">
        <div>
          <div>
            <label htmlFor="speed">SPEED:</label>
            <input type="number" name="speed" id="speed" value={speed} />
          </div>
          <div className="values-button-container">
            <button onClick={() => setSpeed(speed + 1)}>
              <UpIcon size={15} />
            </button>
            <button onClick={() => setSpeed(speed - 1)}>
              <DownIcon size={15} />
            </button>
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="radius">SIZE:</label>
            <input type="number" name="radius" id="radius" value={radius * 2} />
          </div>
          <div className="values-button-container">
            <button onClick={() => setRadius(radius + 1)}>
              <UpIcon size={15} />
            </button>
            <button onClick={() => setRadius(radius - 1)}>
              <DownIcon size={15} />
            </button>
          </div>
        </div>
      </div>
      <div className="selector-container">
        <div>
          <input
            type="checkbox"
            name=""
            id="eliminate"
            onClick={() => setEliminate(!eliminate)}
            checked={eliminate}
          />
          <label htmlFor="eliminate">PIECES DELETE ANOTHER PIECES</label>
        </div>
        <div>
          <input
            type="checkbox"
            name=""
            id="replace"
            onClick={() => setReplace(!replace)}
            checked={replace}
          />
          <label htmlFor="replace">PIECES REPLACE ANOTHER PIECES</label>
        </div>
      </div>
      <div className="game-counters">
        <div className="rock-counter">
          <div className="counter">
            <p>ROCK:</p>
            <p>{rocksNumber}</p>
          </div>
          <button
            className="counter-button-up"
            onClick={() => setRocksNumber(rocksNumber + 1)}
          >
            <UpIcon />
          </button>
          <button
            className="counter-button-down"
            onClick={() => setRocksNumber(rocksNumber - 1)}
          >
            <DownIcon />
          </button>
        </div>
        <div className="paper-counter">
          <div className="counter">
            <p>PAPER:</p>
            <p>{papersNumber}</p>
          </div>
          <button
            className="counter-button-up"
            onClick={() => setPapersNumber(papersNumber + 1)}
          >
            <UpIcon />
          </button>
          <button
            className="counter-button-down"
            onClick={() => setPapersNumber(papersNumber - 1)}
          >
            <DownIcon />
          </button>
        </div>
        <div className="scissors-counter">
          <div className="counter">
            <p>SCISSORS:</p>
            <p>{scissorsNumber}</p>
          </div>
          <button
            className="counter-button-up"
            onClick={() => setScissorsNumber(scissorsNumber + 1)}
          >
            <UpIcon />
          </button>
          <button
            className="counter-button-down"
            onClick={() => setScissorsNumber(scissorsNumber - 1)}
          >
            <DownIcon />
          </button>
        </div>
      </div>

      <div className="clock-counter">
        {externalClock.toString().padStart(2, "0")}
      </div>
      <div className="game-container">
        <p className="watermark">@rock_paper_scissors_daily</p>
        <div
          className={`rock-arrow ${rockArrowClass === "arrow-hidden" ? "arrow-hidden" : rockArrowClass} ${needToHideArrows ? "arrow-invisible" : ""}`}
        >
          <ArrowDownIcon size={30} />
        </div>
        <div
          className={`paper-arrow ${paperArrowClass === "arrow-hidden" ? "arrow-hidden" : paperArrowClass} ${needToHideArrows ? "arrow-invisible" : ""}`}
        >
          <ArrowDownIcon size={30} />
        </div>
        <div
          className={`scissors-arrow ${scissorsArrowClass === "arrow-hidden" ? "arrow-hidden" : scissorsArrowClass} ${needToHideArrows ? "arrow-invisible" : ""}`}
        >
          <ArrowDownIcon size={30} />
        </div>
        <GameComponent
          speed={speed}
          iconRadius={radius}
          rock={rocksNumber}
          paper={papersNumber}
          scissor={scissorsNumber}
          eliminate={eliminate}
          replace={replace}
          setRocksNumber={setRocksNumber}
          setPapersNumber={setPapersNumber}
          setScissorsNumber={setScissorsNumber}
          setClock={setExternalClock}
          rockArrowClass={rockArrowClass}
          paperArrowClass={paperArrowClass}
          scissorsArrowClass={scissorsArrowClass}
          setShowModal={setShowModal}
          setModalInfo={setModalInfo}
          gameReady={gameReady}
          setGameReady={setGameReady}
        />
      </div>
      <div className="buttons-container">
        <button
          className="primary-button"
          onClick={() => selectItemsStartingPoint()}
        >
          PREPARE
        </button>
        <button
          className="primary-button"
          id="startButton"
          onClick={() => setNeedToHideArrows(true)}
        >
          START
        </button>
      </div>
    </main>
  );
}
