import { createPortal } from "react-dom";
import "./modal.css";

const ModalComponent = ({
  closeModal,
  children,
}: {
  closeModal?: () => void;
  children?: React.ReactNode;
}) => {
  return createPortal(
    <div className="modal-portal" onClick={closeModal}>
      <div>
        <div>{children}</div>
        <button className="primary-button">RESET</button>
      </div>
    </div>,
    document.body,
  );
};

export default ModalComponent;
