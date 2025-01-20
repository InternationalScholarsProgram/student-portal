import { TextField, TextFieldProps } from "@mui/material";
import { inputStyles } from "../styles/styles";

function InputField(props: TextFieldProps) {
  return (
    <TextField
      {...props}
      sx={inputStyles}
      slotProps={{
        input: {
          onChange: props.onChange,
          ...props.slotProps?.input,
          style: {
            fontSize: "0.85rem",
          },
        },
      }}
    />
  );
}

export default InputField;
