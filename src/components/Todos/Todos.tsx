import React, { FC, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { motion } from "framer-motion";
import style from './Todos.module.scss'
import {
  useCreateTodosMutation,
  useGetAllTodosQuery,
  useDeleteTodosMutation,
  useUpdateTodosMutation,
  useGetAllTodosByStatusQuery,
} from "../../service/TodosService";
import Todo, { ITodo } from "../Todo/Todo";
import BasicTextFields from "../../shared/InputTask/InputTask";
import AddButton from "../../shared/Button/Button";
import ButtonFilterGroup from "../../features/ButtonGroup/ButtonFilterGroup";
import { SelectedTodo } from "../../model/SelectType";

const Todos: FC = () => {
  const [title, setTitel] = useState("");
  const { data, error, isLoading } = useGetAllTodosQuery(10);
  const [createTodos, {}] = useCreateTodosMutation();
  const [updateTodos, {}] = useUpdateTodosMutation();
  const [deleteTodos, {}] = useDeleteTodosMutation();
  const { data: completedTodos } = useGetAllTodosByStatusQuery(true);
  const { data: incompleteTodos } = useGetAllTodosByStatusQuery(false);
  const [filter, setFilter] = useState("All");

  const handleNewTodo = async () => {
    if (title) {
      await createTodos({ title }).unwrap();
      setTitel("");
    }
  };

  const handleUpdateTodo = async (
    id: number,
    title: string,
    completed: boolean
  ) => {
    await updateTodos({ id, title, completed } as ITodo);
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodos({ id } as ITodo);
  };

  const filterTodos = () => {
    if (filter === "Active") {
      return incompleteTodos || [];
    } else if (filter === "Completed") {
      return completedTodos || [];
    } else {
      return data || [];
    }
  };

  return (
    <div>
      <div className={style.textFields}>
        <BasicTextFields
          placeholder="Add new task"
          value={title}
          onChange={(e) => setTitel(e.target.value)}
        />
        <AddButton onClick={handleNewTodo}>ADD</AddButton>
      </div>
      <div className={style.filter}>
        <ButtonFilterGroup filter={filter} setFilter={setFilter} />
      </div>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Error</h1>}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Grid
          container
          style={{ maxWidth: 1200, margin: "0 auto"}}
          rowSpacing={1}
          columnSpacing={1}
          rowGap={6}
          columnGap={2}
          zIndex={2}
        >
          {filterTodos().map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.5 }}
            >
              <Todo
                todo={todo}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
              />
            </motion.div>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Todos;