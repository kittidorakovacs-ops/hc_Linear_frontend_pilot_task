// src/component/ui/modal/ConfirmDialog.tsx
import React from "react";
import Modal from "./Modal";

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
        <button
          type="button"
          className="hcl-btn"
          onClick={onCancel}
          style={{
            padding: "6px 12px",
            fontSize: "0.85rem",
            background: "var(--button-background-color-grey)",
            border: "none",
            borderRadius: "8px",
            color: "var(--text-color-dark)",
          }}
        >
          {cancelLabel}
        </button>

        <button
          type="button"
          className="hcl-btn"
          onClick={onConfirm}
          style={{
            padding: "6px 12px",
            fontSize: "0.85rem",
            background: "var(--cancel-delete-button-color)",
            border: "none",
            borderRadius: "8px",
            color: "#ffffff",
          }}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
