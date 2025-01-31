import { TextField, TextFieldProps } from "@mui/material";
import { inputStyles } from "../../styles/styles";
import {
  DatePicker,
  DateTimePicker,
  TimePicker,
} from "@mui/x-date-pickers";

function InputField(props: TextFieldProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onChange, type, ...rest } = props;

  if (props.type === "date")
    return (
      <DatePicker
        onChange={(e: any) => onChange?.(e)}
        slotProps={{
          textField: { ...rest, size: "medium" },
        }}
      />
    );
  if (props.type === "datetime-local")
    return (
      <DateTimePicker
        onChange={(e: any) => onChange?.(e)}
        slotProps={{
          textField: { ...rest, size: "small" },
        }}
      />
    );
  if (props.type === "time")
    return (
      <TimePicker
        onChange={(e: any) => onChange?.(e)}
        slotProps={{
          textField: { ...rest, size: "small" },
        }}
      />
    );
  return (
    <TextField
      {...props}
      sx={{ ...inputStyles, ...((props.sx as any) || {}) }}
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
