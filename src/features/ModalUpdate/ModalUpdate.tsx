import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import BasicTextFields from "../../shared/InputTask/InputTask";

import { ITodo } from "../../components/Todo/Todo";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface ModalUpdateProps {
  todo: ITodo;
  onUpdate: (id: number, newTitle: string, completed: boolean) => void;
}

const ModalUpdate: React.FC<ModalUpdateProps> = ({ todo, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitel] = useState("");

  return (
    <div>
      <BorderColorOutlinedIcon
        className="update-icon"
        fontSize="small"
        color="primary"
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <BasicTextFields
            value={title}
            onChange={(e) => setTitel(e.target.value)}
          />
          <Button
            onClick={async () => {
              try {
                await onUpdate(todo.id || 0, title, todo.completed || false);
                handleClose();
                setTitel("");
              } catch (error) {
                console.warn(error);
              }
            }}
          >
            Update
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalUpdate;
