// src/page/board/StatusSelect.tsx
import React, { useState } from "react";
import type { TaskStatus, BoardTask } from "./board.types";

type StatusSelectProps = {
  task: BoardTask;
  onSave: (newStatus: TaskStatus) => void;
  onCancel: () => void;
};

const StatusSelect: React.FC<StatusSelectProps> = ({
  task,
  onSave,
  onCancel,
}) => {
  const [value, setValue] = useState<TaskStatus>(task.status);

  return (
    <div style={{ paddingTop: 8 }}>
      <label
        htmlFor="status-select"
        style={{
          fontSize: "0.9rem",
          color: "var(--text-color-light)",
          display: "block",
          marginBottom: 6,
        }}
      >
        Új státusz:
      </label>

      <select
        id="status-select"
        className="hcl-input"
        style={{ width: "100%", marginBottom: 20 }}
        value={value}
        onChange={(e) => setValue(e.target.value as TaskStatus)}
      >
        <option value="todo">Teendő</option>
        <option value="in_progress">Folyamatban</option>
        <option value="done">Kész</option>
      </select>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <button
          type="button"
          className="hcl-btn"
          style={{
            background: "var(--button-background-color-grey)",
            color: "var(--text-color-dark)",
          }}
          onClick={onCancel}
        >
          Mégse
        </button>
        <button
          type="button"
          className="hcl-btn"
          style={{
            background: "var(--primary-color)",
            color: "var(--text-color-dark)",
          }}
          onClick={() => onSave(value)}
        >
          Mentés
        </button>
      </div>
    </div>
  );
};

export default StatusSelect;
