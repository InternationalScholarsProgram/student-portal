import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {
  InputLabel,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from "@mui/material";
import React from "react";

type SelectProps<T = unknown> = {
  placeholder: string;
  children: React.ReactNode;
} & MuiSelectProps<T>;

export default function Select<T = unknown>({
  placeholder,
  children,
  variant = "standard",
  ...props
}: SelectProps<T>) {
  return (
    <FormControl variant={variant || "standard"} className="w-full">
      <InputLabel id={props.labelId || "select-label"}>
        {placeholder}
      </InputLabel>
      <MuiSelect {...props} labelId={props.labelId || "select-label"}>
        {children}
      </MuiSelect>
    </FormControl>
  );
}
