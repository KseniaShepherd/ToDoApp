import * as React from "react";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
interface AddButtonProps {
  children: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const AddButton: React.FC<AddButtonProps> = ({ onClick, children }) => {
  return (
    <motion.div
      className="animatable1"
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.9 }}
    >
      <Button
        size="large"
        variant="contained"
        className="animatable1"
        onClick={onClick}
      >
        {children}
      </Button>
    </motion.div>
  );
};
export default AddButton;
