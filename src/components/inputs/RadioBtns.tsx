import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from "@mui/material";
import React from "react";

interface Props extends RadioGroupProps {
  title: string;
  options: any[];
}

const RadioBtns: React.FC<Props> = ({ title, options, ...props }) => {
  return (
    <FormControl>
      <FormLabel id="radioBtns">{title}</FormLabel>
      <RadioGroup {...props} aria-labelledby="radioBtns">
        {options?.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioBtns;
