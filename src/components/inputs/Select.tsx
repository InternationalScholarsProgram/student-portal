import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {
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
  ...props
}: SelectProps<T>) {
  return (
    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
      <label id={props.labelId || "select-label"}>{placeholder}</label>
      <MuiSelect {...props} labelId={props.labelId || "select-label"}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {children}
      </MuiSelect>
    </FormControl>
  );
}
