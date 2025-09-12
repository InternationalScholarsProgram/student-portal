import React from "react";
import {
  InputLabel,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";

type SelectProps = MuiSelectProps & {
  placeholder?: string;
  children: React.ReactNode;
};

const Select: React.FC<SelectProps> = ({
  placeholder,
  children,
  variant = "standard",
  ...props
}) => {
  return (
    <FormControl variant={variant} className="w-full">
      {placeholder && (
        <InputLabel id={props.labelId || "select-label"}>
          {placeholder}
        </InputLabel>
      )}
      <MuiSelect {...props} labelId={props.labelId || "select-label"}>
        {children}
      </MuiSelect>
    </FormControl>
  );
};
export default Select;
