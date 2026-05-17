import PaperIcon from "../../../icons/paper";
import RockIcon from "../../../icons/rock";
import ScissorsIcon from "../../../icons/scissors";
import type { ModalInfo } from "../../../types/types";

export default function EndGameModalComponent({
  modalInfo,
}: {
  modalInfo: ModalInfo;
}) {
  return (
    <>
      <p>GAME SUMMARY</p>
      <div>
        <p>WINNER: {modalInfo.winner}</p>
        <p>
          Surviving items: {modalInfo.winnerSurvivalItems}{" "}
          {modalInfo.winner?.toLowerCase()}
          {""}
          {modalInfo.winner !== "SCISSORS" &&
            (modalInfo.winnerSurvivalItems as number) > 1 &&
            "s"}
        </p>
      </div>
      <div>
        <p>First loser: {modalInfo.firstLoser}</p>
        <p>Time to lose: {modalInfo.firstLoserTime} seconds</p>
      </div>
      <p>Second loser: {modalInfo.secondLoser}</p>
      <p>Total time: {modalInfo.totalTime} seconds</p>
      {modalInfo.winner === "ROCK" && (
        <RockIcon size={400} className="svg-icon" />
      )}
      {modalInfo.winner === "PAPER" && (
        <PaperIcon size={400} className="svg-icon" />
      )}
      {modalInfo.winner === "SCISSORS" && (
        <ScissorsIcon size={400} className="svg-icon" />
      )}
    </>
  );
}
