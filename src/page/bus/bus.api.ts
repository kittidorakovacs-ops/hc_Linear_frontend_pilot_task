// src/page/bus/bus.api.ts
import axios from "axios";
import type { Bus } from "./bus.types";

const busesApi = axios.create({
  baseURL: "http://localhost:3001",
});

export const fetchBuses = async (): Promise<Bus[]> => {
  const res = await busesApi.get<Bus[]>("/buses");
  return res.data;
};

export const fetchBus = async (id: number): Promise<Bus> => {
  const res = await busesApi.get<Bus>(`/buses/${id}`);
  return res.data;
};

export const createBus = async (payload: Omit<Bus, "id">): Promise<Bus> => {
  const res = await busesApi.post<Bus>("/buses", payload);
  return res.data;
};

export const updateBus = async (
  id: number,
  payload: Partial<Bus>
): Promise<Bus> => {
  const res = await busesApi.patch<Bus>(`/buses/${id}`, payload);
  return res.data;
};

export const deleteBus = async (id: number): Promise<void> => {
  await busesApi.delete(`/buses/${id}`);
};
