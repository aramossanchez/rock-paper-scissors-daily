import { useState } from "react";
import GameComponent from "../../components/game/game";
import "./home.css";
import UpIcon from "../../icons/up";
import DownIcon from "../../icons/down";
import ArrowDownIcon from "../../icons/arrow-down";
import type { ArrowClasses } from "../../types/types";

export default function HomeContainer() {
  const [speed, setSpeed] = useState(1);
  const [radius, setRadius] = useState(2);
  const [rocksNumber, setRocksNumber] = useState(10);
  const [papersNumber, setPapersNumber] = useState(10);
  const [scissorsNumber, setScissorsNumber] = useState(10);
  const [eliminate, setEliminate] = useState(true);
  const [replace, setReplace] = useState(false);
  const [clock, setClock] = useState<number>(0);
  const [rockArrowClass, setRockArrowClass] =
    useState<ArrowClasses>("arrow-bottom-left");
  const [paperArrowClass, setPaperArrowClass] =
    useState<ArrowClasses>("arrow-top-left");
  const [scissorsArrowClass, setScissorsArrowClass] =
    useState<ArrowClasses>("arrow-top-right");

  return (
    <main className="home">
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

      <div className="clock-counter">{clock.toString().padStart(2, "0")}</div>
      <div className="game-container">
        <p className="watermark">@rock_paper_scissors_daily</p>
        <div className={`rock-arrow ${rockArrowClass}`}>
          <ArrowDownIcon size={30} />
        </div>
        <div className={`paper-arrow ${paperArrowClass}`}>
          <ArrowDownIcon size={30} />
        </div>
        <div className={`scissors-arrow ${scissorsArrowClass}`}>
          <ArrowDownIcon size={30} />
        </div>
        <GameComponent
          rock={rocksNumber}
          paper={papersNumber}
          scissor={scissorsNumber}
          eliminate={eliminate}
          replace={replace}
          setRocksNumber={setRocksNumber}
          setPapersNumber={setPapersNumber}
          setScissorsNumber={setScissorsNumber}
          setClock={setClock}
        />
      </div>
      <div className="buttons-container">
        <button className="primary-button">PREPARE</button>
        <button className="primary-button" id="startButton">
          START
        </button>
      </div>
    </main>
  );
}
