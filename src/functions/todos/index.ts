import schema from "./schema";
import { handlerPath } from "@libs/handlerResolver";

export const createTodo = {
  handler: `${handlerPath(__dirname)}/create.main`,
  events: [
    {
      http: {
        method: "post",
        path: "todos/{userid}",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
export const getTodo = {
  handler: `${handlerPath(__dirname)}/get.main`,
  events: [
    {
      http: {
        method: "get",
        path: "todos/{userid}",
      },
    },
  ],
};
