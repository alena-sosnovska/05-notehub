import {createPortal} from "react-dom";
import css from "./Modal.module.css";
import {useEffect} from "react";

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
    
}

export default function Modal({ onClose, children }: ModalProps) {
    
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    return null;
  }

    return createPortal(
  <div className={css.backdrop} role="dialog" aria-modal="true" onClick={onClose}>
    <div className={css.modal} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </div>,
  modalRoot
)};
