// src/config/routes.ts
export const APP_ROUTES = {
  TASK: "/",

  // bus task - routes
  BUS_CRUD: "/buses",
  BUS_DETAIL: "/buses/:id",
  BUS_EDIT: "/buses/:id/edit",

  // board (trello) - routes
  BOARD: "/board",
};

export const getBusDetailRoute = (id: string | number) => `/buses/${id}`;
export const getBusEditRoute = (id: string | number) => `/buses/${id}/edit`;
