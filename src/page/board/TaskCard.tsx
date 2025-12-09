// src/page/board/TaskCard.tsx
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import type { BoardTask } from "./board.types";

import {
  BoardDeleteIconButton,
  BoardEditIconButton,
  BoardAddButton,
  BoardCancelButton,
} from "./style/boardButtons.style";

type TaskCardProps = {
  task: BoardTask;
  onDelete?: () => void;
  onEdit?: (newTitle: string) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onClick?: () => void;
  isDragging?: boolean;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDelete,
  onEdit,
  onDragStart,
  onDragEnd,
  onClick,
  isDragging,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const statusClass = `board-task-card--${task.status}`;

  const className = [
    "board-task-card",
    statusClass,
    isDragging ? "board-task-card--dragging" : "",
  ].join(" ");

  const handleSave = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      setIsEditing(false);
      setDraft(task.title);
      return;
    }
    if (trimmed !== task.title) {
      onEdit?.(trimmed);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setDraft(task.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={className}
      draggable={!isEditing} 
      onDragStart={!isEditing ? onDragStart ?? undefined : undefined}
      onDragEnd={!isEditing ? onDragEnd ?? undefined : undefined}
      onClick={() => !isEditing && onClick?.()}
    >
      {/* --- EDIT MÓD --- */}
      {isEditing && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <input
            className="hcl-input"
            value={draft}
            autoFocus
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ fontSize: "0.85rem" }}
            onClick={(e) => e.stopPropagation()}
          />

          <div style={{ display: "flex", gap: 8 }}>
            <BoardAddButton type="button" onClick={handleSave}>
              Mentés
            </BoardAddButton>

            <BoardCancelButton
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setDraft(task.title);
                setIsEditing(false);
              }}
            >
              Mégse
            </BoardCancelButton>
          </div>
        </div>
      )}

      {/* --- NORMAL MODE --- */}
      {!isEditing && (
        <>
          <div className="board-task-title">{task.title}</div>

          {task.description && (
            <div className="board-task-description">{task.description}</div>
          )}

          <div className="board-task-actions">
            {onEdit && (
              <BoardEditIconButton
                type="button"
                title="Szerkesztés"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
              >
                <EditIcon fontSize="small" />
              </BoardEditIconButton>
            )}

            {onDelete && (
              <BoardDeleteIconButton
                type="button"
                title="Törlés"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </BoardDeleteIconButton>
            )}
          </div>
        </>
      )}
    </div>
  );
};
