import {createPortal} from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
    
}

export default function Modal({ onClose, children }: ModalProps) {
    return createPortal(
  <div className={css.backdrop} role="dialog" aria-modal="true" onClick={onClose}>
    <div className={css.modal} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </div>,
  document.getElementById("modal-root")!
)};
