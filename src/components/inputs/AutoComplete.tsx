import React from "react";
import { ComponentProps } from "react";
import { Autocomplete as MuiAutocomplete, TextField } from "@mui/material";

interface Props extends ComponentProps<typeof TextField> {
  options: any[];
  isLoading?: boolean;
  defaultValue?: any;
  handleSelect?: (_: any, value: any) => void;
  getOptionLabel?: (option: any) => string;
}

const AutoComplete: React.FC<Props> = ({
  options = [],
  handleSelect,
  getOptionLabel,
  defaultValue,
  ...props
}) => {
  return (
    <MuiAutocomplete
      {...(defaultValue && { defaultValue })}
      getOptionLabel={getOptionLabel}
      options={options}
      onChange={handleSelect}
      size="medium"
      renderInput={(params) => {
        return <TextField {...params} {...props} size="medium" />;
      }}
    />
  );
};

export default AutoComplete;
