import React from "react";
import { ComponentProps } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { inputStyles } from "../../styles/styles";

interface Props extends ComponentProps<typeof TextField> {
  options: any[];
  isLoading?: boolean;
  handleSelect?: (_: any, value: any) => void;
  getOptionLabel?: (option: any) => string;
}

const AutoComplete: React.FC<Props> = ({
  options,
  handleSelect,
  getOptionLabel,
  isLoading = false,
  ...props
}) => {
  return (
    <Autocomplete
      getOptionLabel={getOptionLabel}
      options={options}
      onChange={handleSelect}
      loading={isLoading}
      renderInput={(params) => (
        <TextField {...params} {...props} sx={inputStyles} />
      )}
    />
  );
};

export default AutoComplete;
