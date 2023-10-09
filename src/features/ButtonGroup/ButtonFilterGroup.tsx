import React, { FC } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

interface ButtonFilterGroupProps {
  filter: string;
  setFilter: (filter: string) => void;
}
const ButtonFilterGroup: FC<ButtonFilterGroupProps> = ({
  filter,
  setFilter,
}) => {
  return (
    <ButtonGroup variant="text" aria-label="text button group">
      <Button onClick={() => setFilter("Active")}>Active</Button>
      <Button onClick={() => setFilter("Completed")}>Completed</Button>
      <Button onClick={() => setFilter("All")}>All</Button>
    </ButtonGroup>
  );
};

export default ButtonFilterGroup;
