import React from "react";
import { ComponentProps } from "react";
import { Autocomplete as MuiAutocomplete, TextField } from "@mui/material";

interface Props extends ComponentProps<typeof TextField> {
  options: any[];
  isLoading?: boolean;
  handleSelect?: (_: any, value: any) => void;
  getOptionLabel?: (option: any) => string;
}

const AutoComplete: React.FC<Props> = ({
  options = [],
  handleSelect,
  getOptionLabel,
  ...props
}) => {
  return (
    <MuiAutocomplete
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
