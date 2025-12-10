import React from "react";
import Modal from "./Modal";
import "./ConfirmDialog.css";

type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title = "Megerősítés",
  message,
  confirmLabel = "Igen",
  cancelLabel = "Mégse",
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <p style={{ marginBottom: 16 }}>{message}</p>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button type="button" className="hcl-btn-cancel" onClick={onCancel}>
          {cancelLabel}
        </button>

        <button type="button" className="hcl-btn-confirm" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
