import { TextField, TextFieldProps } from "@mui/material";
import { inputStyles } from "../../styles/styles";
import { DatePicker, DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function InputField(props: TextFieldProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onChange, type, ...rest } = props;

  if (props.type === "date") {
    delete rest.value;
    return (
      <DatePicker
        onChange={(e: any) => onChange?.(e)}
        defaultValue={dayjs(
          typeof props.value === "string" ? props.value : new Date()
        )}
        slotProps={{
          textField: { ...rest, size: "medium" },
        }}
        format="YYYY-MM-DD"
      />
    );
  }
  if (props.type === "datetime-local")
    return (
      <DateTimePicker
        onChange={(e: any) => onChange?.(e)}
        slotProps={{
          textField: { ...rest, size: "medium" },
        }}
      />
    );
  if (props.type === "time")
    return (
      <TimePicker
        onChange={(e: any) => onChange?.(e)}
        slotProps={{
          textField: { ...rest, size: "medium" },
        }}
        format="HH:mm"
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
