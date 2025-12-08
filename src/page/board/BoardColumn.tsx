// src/page/board/BoardColumn.tsx
import React, { useState } from "react";
import type { BoardTask, TaskStatus } from "./board.types";
import {
  Column,
  ColumnHeader,
  ColumnTitle,
  ColumnCounter,
  ColumnBody,
  ColumnFooter,
} from "./style/board.style";
import { TaskCard } from "./TaskCard";
import { TaskCreateForm } from "./TaskCreateForm";


type BoardColumnProps = {
  status: TaskStatus;
  title: string;
  tasks: BoardTask[];
  draggedTaskId: number | null;
  isActiveDropTarget: boolean;
  onDrop: () => void;
  onDragOver: () => void;
  onDragLeave: () => void;
  onTaskDelete: (taskId: number) => void;
  onTaskDragStart: (taskId: number) => void;
  onTaskDragEnd: () => void;
  onTaskClick: (task: BoardTask) => void;
};

export const BoardColumn: React.FC<BoardColumnProps> = ({
  status,
  title,
  tasks,
  draggedTaskId,
  isActiveDropTarget,
  onDrop,
  onDragOver,
  onDragLeave,
  onTaskDelete,
  onTaskDragStart,
  onTaskDragEnd,
  onTaskClick,
}) => {
  const [isAdding, setIsAdding] = useState(false);

  const dropzoneClassName = isActiveDropTarget
    ? "board-column-dropzone board-column-dropzone--active"
    : "board-column-dropzone";

  return (
    <Column
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver();
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop();
      }}
      onDragLeave={onDragLeave}
    >
      <ColumnHeader>
        <ColumnTitle>{title}</ColumnTitle>
        <ColumnCounter>{tasks.length}</ColumnCounter>
      </ColumnHeader>

      <ColumnBody className={dropzoneClassName}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={() => onTaskDelete(task.id)}
            onDragStart={() => onTaskDragStart(task.id)}
            onDragEnd={onTaskDragEnd}
            onClick={() => onTaskClick(task)}
            isDragging={draggedTaskId === task.id}
          />
        ))}
      </ColumnBody>

      <ColumnFooter>
        {!isAdding && (
          <button
            type="button"
            className="hcl-btn-primary-sm"
            onClick={() => setIsAdding(true)}
          >
            + Új feladat
          </button>
        )}

        {isAdding && (
          <TaskCreateForm
            defaultStatus={status}
            onClose={() => setIsAdding(false)}
          />
        )}
      </ColumnFooter>
    </Column>
  );
};
