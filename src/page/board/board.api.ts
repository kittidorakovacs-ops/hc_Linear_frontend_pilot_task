import { boardAxiosClient } from "../../config/axios.config";
import type { BoardTask, TaskStatus } from "./board.types";

const BASE_PATH = "/tasks"; 

export const fetchBoardTasks = async (): Promise<BoardTask[]> => {
  const { data } = await boardAxiosClient.get<BoardTask[]>(BASE_PATH);
  return data;
};

export const createBoardTask = async (payload: {
  title: string;
  status?: TaskStatus;
}): Promise<BoardTask> => {
  const body = {
    title: payload.title,
    status: payload.status ?? "todo",
  };

  const { data } = await boardAxiosClient.post<BoardTask>(BASE_PATH, body);
  return data;
};

export const updateBoardTask = async (
  id: number,
  payload: Partial<Pick<BoardTask, "title" | "description" | "status" | "order">>
): Promise<BoardTask> => {
  const { data } = await boardAxiosClient.patch<BoardTask>(
    `${BASE_PATH}/${id}`,
    payload
  );
  return data;
};

export const deleteBoardTask = async (id: number): Promise<void> => {
  await boardAxiosClient.delete(`${BASE_PATH}/${id}`);
};
