// src/page/bus/bus.hooks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Bus } from "./bus.types";
import {
  fetchBuses,
  fetchBus,
  createBus,
  updateBus,
  deleteBus,
} from "./bus.api";

const BUS_LIST_KEY = ["buses"];

export const useBusesQuery = () =>
  useQuery<Bus[]>({
    queryKey: BUS_LIST_KEY,
    queryFn: fetchBuses,
  });

export const useBusQuery = (id?: number) =>
  useQuery<Bus>({
    queryKey: ["buses", id],
    queryFn: () => fetchBus(id!),
    enabled: !!id,
  });

export const useCreateBusMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createBus,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: BUS_LIST_KEY });
    },
  });
};

export const useUpdateBusMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Bus> }) =>
      updateBus(id, data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: BUS_LIST_KEY });
      qc.invalidateQueries({ queryKey: ["buses", id] });
    },
  });
};

export const useDeleteBusMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteBus,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: BUS_LIST_KEY });
    },
  });
};
