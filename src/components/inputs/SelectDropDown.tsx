import React from "react";
import Box from "@mui/material/Box";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { inputStyles } from "../../styles/styles";

interface SelectDropDownProps {
  onChange: (e: any) => void;
  options: any[];
  placeholder: string;
  display: (option: any) => React.ReactNode;
  [key: string]: TextFieldProps | any;
}

function SelectDropDown({
  onChange,
  options,
  placeholder,
  display,
  value,
  ...props
}: SelectDropDownProps) {
  return (
    <Autocomplete
      options={options}
      value={value}
      isOptionEqualToValue={(option, value) => option.code === value.code}
      autoHighlight
      fullWidth
      onChange={(event, selected) => onChange(selected)}
      getOptionLabel={(option: any) => {
        if (typeof option === "string") return option;
        return option?.label || option?.description;
      }}
      renderOption={(props, option) => {
        const { className, key, ...restProps } = props; //KEY extracted from props because it is not supported in renderOption
        return (
          <Box key={props.id} component="li" className="w-full" {...restProps}>
            {display(option)}
          </Box>
        );
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            {...props}
            sx={inputStyles}
            size="medium"
            placeholder={placeholder}
          />
        );
      }}
    />
  );
}

export default SelectDropDown;
