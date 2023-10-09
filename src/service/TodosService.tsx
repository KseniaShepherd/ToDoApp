import { ITodo } from "../components/Todo/Todo";
import { ITodos } from "../model/ITodos";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["Todos"],
  endpoints: (build) => ({
    getAllTodos: build.query<ITodos[], number>({
      query: (limit) => ({
        url: "/todos",
        // params: {
        //   _limit: limit,
        // },
      }),
      providesTags: (result) => ["Todos"]
    }),
      getAllTodosByStatus: build.query<ITodos[], boolean>({
        query: (completed) => ({
          url: "/todos",
          params: {
            completed: completed.toString(), 
          },
        }),
        providesTags: (result, error, args) => {
          if (!error && result) {
            return [{ type: "Todos", completed: args }] as const;
          }
          return [];
        },
      }),
    createTodos: build.mutation<ITodos, ITodo>({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: { ...todo, completed: false },
      }),
      invalidatesTags: ["Todos"]
    }),

    deleteTodos: build.mutation<ITodos, ITodo>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"]
    }),

    updateTodos: build.mutation<ITodos, ITodo>({
        query: (todo) => ({
          url: `/todos/${todo.id}`,
          method: "PUT",
          body:todo,
        }),
        invalidatesTags: ["Todos"]
      }),
  }),
});

export const { useGetAllTodosQuery, useGetAllTodosByStatusQuery, useCreateTodosMutation, useDeleteTodosMutation, useUpdateTodosMutation } = todosApi;


