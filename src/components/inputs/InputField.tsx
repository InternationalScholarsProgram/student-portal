import { TextField, TextFieldProps } from "@mui/material";
import { inputStyles } from "../../styles/styles";

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

type InputsWithLabelProps = TextFieldProps & {
  inputLabel: string;
};

export const InputsWithLabel = ({
  inputLabel,
  ...props
}: InputsWithLabelProps) => (
  <div className="col">
    <label className="">{inputLabel}</label>
    <InputField {...props} />
  </div>
);

export default InputField;
