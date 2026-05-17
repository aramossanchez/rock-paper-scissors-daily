import PaperIcon from "../../../icons/paper";
import RockIcon from "../../../icons/rock";
import ScissorsIcon from "../../../icons/scissors";
import UpIcon from "../../../icons/up";
import "./typesGuideLoader.css";

export default function TypesGuideLoaderComponent() {
  return (
    <div className="types-guide-loader">
      <RockIcon size={50} className="types-guide-loader-rock-icon" />
      <UpIcon size={50} className="types-guide-loader-arrow-one-icon" />
      <ScissorsIcon size={50} className="types-guide-loader-scissors-icon" />
      <UpIcon size={50} className="types-guide-loader-arrow-two-icon" />
      <PaperIcon size={50} className="types-guide-loader-paper-icon" />
      <UpIcon size={50} className="types-guide-loader-arrow-three-icon" />
    </div>
  );
}
