import { useEffect, type ReactNode } from "react";
import "./Modal.css";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="app-modal-overlay" onClick={onClose}>
      <div
        className="app-modal"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="app-modal-header">
          {title && <h2 className="app-modal-title">{title}</h2>}
          <button
            type="button"
            className="app-modal-close"
            onClick={onClose}
            aria-label="Modal bezárása"
          >
            ✕
          </button>
        </div>

        <div className="app-modal-body">{children}</div>
      </div>
    </div>
  );
}
