// src/page/board/TaskCreateForm.tsx
import React, { useState, useRef, useEffect } from "react";
import { useCreateBoardTaskMutation } from "./board.hooks";
import type { TaskStatus } from "./board.types";
import { useToast } from "../../component/ui/toast/ToastProvider";

import {
  BoardAddButton,
  BoardCancelButton,
} from "./style/boardButtons.style";

type TaskCreateFormProps = {
  defaultStatus: TaskStatus;
  onClose: () => void;
};

export const TaskCreateForm: React.FC<TaskCreateFormProps> = ({
  defaultStatus,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const createTaskMutation = useCreateBoardTaskMutation();
  const { showToast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) return;

    createTaskMutation.mutate(
      { title: trimmed, status: defaultStatus },
      {
        onSuccess: () => {
          showToast({ message: "Feladat hozzáadva.", variant: "success" });
          setTitle("");
          onClose();
        },
        onError: () => {
          showToast({
            message: "Nem sikerült hozzáadni a feladatot.",
            variant: "error",
          });
        },
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  const isDisabled = createTaskMutation.isPending || !title.trim();

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      style={{
        display: "flex",
        flexDirection: "column",   
        gap: 8,
        marginTop: 8,
      }}
    >
      {/* INPUT */}
      <input
        ref={inputRef}
        type="text"
        className="hcl-input"
        placeholder="Új feladat..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ fontSize: "0.85rem" }}
      />

      {/* GOMBOK – egy külön sorban */}
      <div style={{ display: "flex", gap: 8 }}>
        <BoardAddButton type="submit" disabled={isDisabled}>
          Hozzáadás
        </BoardAddButton>

        <BoardCancelButton type="button" onClick={onClose}>
          Mégse
        </BoardCancelButton>
      </div>
    </form>
  );
};
