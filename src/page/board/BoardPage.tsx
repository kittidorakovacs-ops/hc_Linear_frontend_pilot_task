// src/page/board/BoardPage.tsx
import React, { useMemo, useState } from "react";
import { useDocumentTitle } from "../../config/useDocumentTitle";
import {
  useBoardTasksQuery,
  useDeleteBoardTaskMutation,
  useUpdateTaskStatusMutation,
  useUpdateBoardTaskMutation,    // ⬅ ÚJ
} from "./board.hooks";
import { BOARD_COLUMNS } from "./data/board.data";
import type { BoardTask, TaskStatus } from "./board.types";
import Modal from "../../component/ui/modal/Modal";
import StatusSelect from "./StatusSelect";
import { useToast } from "../../component/ui/toast/ToastProvider";
import ConfirmDialog from "../../component/ui/modal/ConfirmDialog";

import {
  Page,
  Header,
  Title,
  Subtitle,
  BoardCard,
  BoardHeaderRow,
  BoardTitle,
  ColumnsWrapper,
} from "./style/board.style";

import { BoardColumn } from "./BoardColumn";
import "./style/board.classes.css";

const BoardPage: React.FC = () => {
  useDocumentTitle("Feladat board - HC Linear");

  const { showToast } = useToast();

  const { data: tasks, isLoading, isError } = useBoardTasksQuery();
  const updateStatusMutation = useUpdateTaskStatusMutation();
  const updateTaskMutation = useUpdateBoardTaskMutation();   // ⬅ ÚJ
  const deleteTaskMutation = useDeleteBoardTaskMutation();

  const [draggedTaskId, setDraggedTaskId] = useState<number | null>(null);
  const [activeDropStatus, setActiveDropStatus] =
    useState<TaskStatus | null>(null);

  const [statusModalTask, setStatusModalTask] = useState<BoardTask | null>(
    null
  );

  const [taskToDelete, setTaskToDelete] = useState<BoardTask | null>(null);

  const tasksByStatus = useMemo(() => {
    const map: Record<TaskStatus, BoardTask[]> = {
      todo: [],
      in_progress: [],
      done: [],
    };

    (tasks ?? []).forEach((task) => {
      map[task.status].push(task);
    });

    return map;
  }, [tasks]);

  const handleTaskDeleteRequest = (taskId: number) => {
    const task = tasks?.find((t) => t.id === taskId) ?? null;
    setTaskToDelete(task);
  };

  const handleConfirmDelete = () => {
    if (!taskToDelete) return;

    deleteTaskMutation.mutate(taskToDelete.id, {
      onSuccess: () => {
        showToast({ message: "Feladat törölve.", variant: "success" });
      },
      onError: () => {
        showToast({
          message: "Nem sikerült törölni a feladatot.",
          variant: "error",
        });
      },
    });

    setTaskToDelete(null);
  };

  const handleDropOnColumn = (status: TaskStatus) => {
    if (draggedTaskId == null) return;

    updateStatusMutation.mutate(
      { id: draggedTaskId, status },
      {
        onSuccess: () => {
          showToast({
            message: "Feladat státusza frissítve.",
            variant: "success",
          });
        },
        onError: () => {
          showToast({
            message: "Nem sikerült frissíteni a státuszt.",
            variant: "error",
          });
        },
      }
    );

    setDraggedTaskId(null);
    setActiveDropStatus(null);
  };

  const handleTaskClick = (task: BoardTask) => {
    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;

    if (!isTouch) return;

    setStatusModalTask(task);
  };


  const handleTaskTitleEdit = (taskId: number, newTitle: string) => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;

    updateTaskMutation.mutate(
      { id: taskId, data: { title: trimmed } },
      {
        onSuccess: () => {
          showToast({
            message: "Feladat címe frissítve.",
            variant: "success",
          });
        },
        onError: () => {
          showToast({
            message: "Nem sikerült frissíteni a címet.",
            variant: "error",
          });
        },
      }
    );
  };

  return (
    <Page>
      <Header>
        <Title variant="h3">Feladatboard</Title>
        <Subtitle>
          Húzd a feladatokat oszlopok között (desktop). Koppints a kártyára
          státuszváltáshoz (mobil).
        </Subtitle>
      </Header>

      <BoardCard>
        <BoardHeaderRow>
          <BoardTitle>Feladatok státusz szerint</BoardTitle>
        </BoardHeaderRow>

        {isLoading && <p>Betöltés...</p>}
        {isError && <p>Hiba történt.</p>}

        {!isLoading && !isError && (
          <ColumnsWrapper>
            {BOARD_COLUMNS.map((column) => (
              <BoardColumn
                key={column.id}
                status={column.id}
                title={column.title}
                tasks={tasksByStatus[column.id]}
                draggedTaskId={draggedTaskId}
                isActiveDropTarget={activeDropStatus === column.id}
                onDrop={() => handleDropOnColumn(column.id)}
                onDragOver={() => setActiveDropStatus(column.id)}
                onDragLeave={() =>
                  setActiveDropStatus((prev) =>
                    prev === column.id ? null : prev
                  )
                }
                onTaskDelete={handleTaskDeleteRequest}
                onTaskDragStart={setDraggedTaskId}
                onTaskDragEnd={() => setDraggedTaskId(null)}
                onTaskClick={handleTaskClick}
                onTaskEdit={handleTaskTitleEdit}   // ⬅ ÚJ PROP
              />
            ))}
          </ColumnsWrapper>
        )}
      </BoardCard>

      {/* Státuszváltó modal (mobil) */}
      {statusModalTask && (
        <Modal
          open={!!statusModalTask}
          onClose={() => setStatusModalTask(null)}
          title="Státusz módosítása"
        >
          <StatusSelect
            task={statusModalTask}
            onCancel={() => setStatusModalTask(null)}
            onSave={(newStatus) => {
              updateStatusMutation.mutate(
                {
                  id: statusModalTask.id,
                  status: newStatus,
                },
                {
                  onSuccess: () => {
                    showToast({
                      message: "Feladat státusza frissítve.",
                      variant: "success",
                    });
                  },
                  onError: () => {
                    showToast({
                      message: "Nem sikerült frissíteni a státuszt.",
                      variant: "error",
                    });
                  },
                }
              );

              setStatusModalTask(null);
            }}
          />
        </Modal>
      )}

      {/* Törlés megerősítő dialog */}
      <ConfirmDialog
        open={!!taskToDelete}
        title="Törlés megerősítése"
        message="Biztosan törlöd ezt a feladatot?"
        confirmLabel="Igen, törlöm"
        cancelLabel="Mégse"
        onConfirm={handleConfirmDelete}
        onCancel={() => setTaskToDelete(null)}
      />
    </Page>
  );
};

export default BoardPage;
