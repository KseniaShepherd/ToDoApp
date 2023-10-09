import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import "./Todo.css";
import ModalUpdate from "../../features/ModalUpdate/ModalUpdate";
import { motion } from "framer-motion";

export interface ITodo {
  completed?: boolean;
  id?: number;
  title: string;
}

interface TodoProps {
  todo: ITodo;
  onUpdate: (id: number, newTitle: string, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, onUpdate, onDelete }) => {
  const [isCompleted, setIsCompleted] = React.useState(todo.completed || false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isExiting, setIsExiting] = React.useState(false);

  const handleUpdate = () => {
    onUpdate(todo.id || 0, todo.title, !todo.completed);
  };

  const handleDelete = () => {
    setIsExiting(true); 
    setTimeout(() => {
      onDelete(todo.id || 0);
    }, 300); 
  };

  return (
    <motion.div
      initial={{ opacity: 1, x: 0 }}
      animate={{
        opacity: isExiting ? 0 : 1,
        x: isExiting ? -1000 : 0,
        scale: isHovered ? 0.8 : 1,
      }}
      exit={{ opacity: 0, x: -1000 }}
      className="animatable"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card sx={{ minWidth: 275 }} className="animatable">
        <CardContent className="cardContent">
          <motion.div
            initial={{ textDecoration: isCompleted ? "line-through" : "none" }}
            animate={{ textDecoration: isCompleted ? "line-through" : "none" }}
            transition={{ duration: 2000.0, ease: "easeInOut" }}
          >
            <Typography sx={{ fontSize: 18 }} color="text" gutterBottom>
              {todo.title}
            </Typography>
          </motion.div>
          <DoneOutlineOutlinedIcon
            className={`done-icon ${isCompleted ? "completed" : ""}`}
            fontSize="small"
            color={isCompleted ? "primary" : "inherit"}
            onClick={() => {
              setIsCompleted(!isCompleted);
              handleUpdate();
            }}
          />
        </CardContent>
        <CardActions className="card">
          {isHovered && (
            <motion.div
              whileHover={{
                opacity: 1,
                scale: 1.5,
              }}
            >
              <ModalUpdate todo={todo} onUpdate={onUpdate} />
            </motion.div>
          )}
          {isHovered && (
            <motion.div
              whileHover={{
                opacity: 1,
                scale: 1.5,
              }}
            >
              <DeleteSweepOutlinedIcon
                className="delete-icon"
                fontSize="small"
                color="primary"
                onClick={handleDelete}
              />
            </motion.div>
          )}
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default Todo;
