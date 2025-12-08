import type { TaskStatus } from "../board.types";

export interface BoardColumnConfig {
  id: TaskStatus;
  title: string;
}

export const BOARD_COLUMNS: BoardColumnConfig[] = [
  { id: "todo",        title: "Teendő" },
  { id: "in_progress", title: "Folyamatban" },
  { id: "done",        title: "Kész" },
];
