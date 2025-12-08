import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import type { BoardTask } from "./board.types";

type TaskCardProps = {
  task: BoardTask;
  onDelete?: () => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onClick?: () => void;
  isDragging?: boolean;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDelete,
  onDragStart,
  onDragEnd,
  onClick,
  isDragging,
}) => {
  const statusClass = `board-task-card--${task.status}`;
const className = [
  "board-task-card",
  statusClass,
  isDragging ? "board-task-card--dragging" : ""
].join(" ");


  return (
    <div
      className={className}
      draggable
      onDragStart={onDragStart ?? undefined}
      onDragEnd={onDragEnd ?? undefined}
      onClick={() => onClick?.()}
    >
      <div className="board-task-title">{task.title}</div>

      {task.description && (
        <div className="board-task-description">{task.description}</div>
      )}

      <div className="board-task-actions">
        {onDelete && (
          <button
            type="button"
            className="hcl-icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </button>
        )}
      </div>
    </div>
  );
};
