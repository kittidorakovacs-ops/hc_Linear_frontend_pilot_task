import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchBoardTasks,
  createBoardTask,
  updateBoardTask,
  deleteBoardTask,
} from "./board.api";
import type { BoardTask, TaskStatus } from "./board.types";

const BOARD_QUERY_KEY = ["board"];

export const useBoardTasksQuery = () =>
  useQuery<BoardTask[]>({
    queryKey: BOARD_QUERY_KEY,
    queryFn: fetchBoardTasks,
  });

export const useCreateBoardTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBoardTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOARD_QUERY_KEY });
    },
  });
};

export const useUpdateTaskStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number;
      status: TaskStatus;
    }) => updateBoardTask(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOARD_QUERY_KEY });
    },
  });
};

export const useDeleteBoardTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBoardTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOARD_QUERY_KEY });
    },
  });
};
