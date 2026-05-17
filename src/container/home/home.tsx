import { useState } from "react";
import GameComponent from "../../components/game/game";
import "./home.css";
import UpIcon from "../../icons/up";
import DownIcon from "../../icons/down";
import ArrowDownIcon from "../../icons/arrow-down";
import type { ArrowClasses, ModalInfo } from "../../types/types";
import ModalComponent from "../../components/modal/modal";
import { ARROW_CLASSES } from "../../constants/constants";
import RockIcon from "../../icons/rock";
import PaperIcon from "../../icons/paper";
import ScissorsIcon from "../../icons/scissors";
import EndGameModalComponent from "../../components/modal/endGameModal/endGameModal";

export default function HomeContainer() {
  const [speed, setSpeed] = useState(2);
  const [radius, setRadius] = useState(15);
  const [rocksNumber, setRocksNumber] = useState(1);
  const [papersNumber, setPapersNumber] = useState(1);
  const [scissorsNumber, setScissorsNumber] = useState(1);
  const [eliminate, setEliminate] = useState(false);
  const [replace, setReplace] = useState(false);
  const [externalClock, setExternalClock] = useState<number>(0);
  const [rockArrowClass, setRockArrowClass] = useState<ArrowClasses | null>(
    null,
  );
  const [paperArrowClass, setPaperArrowClass] = useState<ArrowClasses | null>(
    null,
  );
  const [scissorsArrowClass, setScissorsArrowClass] =
    useState<ArrowClasses | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
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
          <EndGameModalComponent modalInfo={modalInfo} />
        </ModalComponent>
      )}
      {/* TITULO DE LA APP */}
      <p className="title-app">ROCK - PAPER - SCISSORS</p>
      {/* TEXTO DESCRIPTIVO DE LA APP (ES UN CALL TO ACTION) */}
      <p className="instagram-follow">
        Follow us on Instagram: <strong>@rock_paper_scissors_daily</strong>
      </p>
      {/* SE MODIFICAN VELOCIDAD Y TAMAÑO DE LOS ITEMS */}
      <div className="values-container">
        <div>
          <div>
            <label htmlFor="speed">SPEED:</label>
            <input
              type="number"
              name="speed"
              id="speed"
              value={speed}
              readOnly
            />
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
            <input
              type="number"
              name="radius"
              id="radius"
              value={radius * 2}
              readOnly
            />
          </div>
          <div className="values-button-container">
            <button onClick={() => setRadius(radius + 0.5)}>
              <UpIcon size={15} />
            </button>
            <button onClick={() => setRadius(radius - 0.5)}>
              <DownIcon size={15} />
            </button>
          </div>
        </div>
      </div>
      {/* SE MODIFICA SI LOS ITEMS GANADORES ELIMINAN O REEMPLAZAN A LOS PERDEDORES */}
      <div className="selector-container">
        <div>
          <input
            type="checkbox"
            name=""
            id="eliminate"
            onClick={() => setEliminate(!eliminate)}
            defaultChecked={eliminate}
          />
          <label htmlFor="eliminate">PIECES REMOVE OTHER PIECES</label>
        </div>
        <div>
          <input
            type="checkbox"
            name=""
            id="replace"
            onClick={() => setReplace(!replace)}
            defaultChecked={replace}
          />
          <label htmlFor="replace">PIECES REPLACE OTHER PIECES</label>
        </div>
      </div>
      {/* SE MUESTRAN LOS ITEMS DE CADA TIPO, Y DA LA POSIBILIDAD DE MODIFICARLOS */}
      <div className="game-counters">
        <div className="rock-counter">
          <RockIcon size={50} className="svg-icon" />
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
          <PaperIcon size={50} className="svg-icon" />
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
          <ScissorsIcon size={50} className="svg-icon" />
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
      {/* EL CONTADOR DEL TIEMPO DE JUEGO */}
      <div className="clock-counter">
        {externalClock.toString().padStart(2, "0")}
      </div>
      <div className="game-container">
        {/* MARCA DE AGUA POR SI ACASO ME INTENTAN GRABAR LA PANTALLA DE LOS REELS (SI, FIJO QUE PASA) */}
        <p className="watermark">@rock_paper_scissors_daily</p>
        {/* FLECHAS QUE INDICAN DESDE DONDE EMPIEZA CADA TIPO DE ITEM */}
        <div
          className={`rock-arrow ${!rockArrowClass ? "arrow-hidden" : rockArrowClass} ${needToHideArrows ? "arrow-invisible" : ""}`}
        >
          <ArrowDownIcon size={30} />
        </div>
        <div
          className={`paper-arrow ${!paperArrowClass ? "arrow-hidden" : paperArrowClass} ${needToHideArrows ? "arrow-invisible" : ""}`}
        >
          <ArrowDownIcon size={30} />
        </div>
        <div
          className={`scissors-arrow ${!scissorsArrowClass ? "arrow-hidden" : scissorsArrowClass} ${needToHideArrows ? "arrow-invisible" : ""}`}
        >
          <ArrowDownIcon size={30} />
        </div>
        {/* MUESTRA EL CONTENIDO DEL JUEGO */}
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
        />
      </div>
      {/* BOTONES DE PREPARAR Y DE EMPEZAR EL JUEGO */}
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
