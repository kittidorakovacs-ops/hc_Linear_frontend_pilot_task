export type TaskStatus = "todo" | "in_progress" | "done";

export interface BoardTask {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  order?: number;
}
