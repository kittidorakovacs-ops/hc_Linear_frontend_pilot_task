export type BusStatus = "operational" | "active" | "maintenance" | "inactive";

export interface Bus {
  id: number;
  plate: string;
  model: string;
  status: string;
  capacity: number;
}
