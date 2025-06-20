import { TextField, TextFieldProps } from "@mui/material";
import { inputStyles } from "../../styles/styles";
import { DatePicker, DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function InputField(props: TextFieldProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onChange, type, ...rest } = props;

  if (props.type === "date") {
    delete rest.value;
    delete rest.defaultValue;
    const isValue =
      typeof props.defaultValue === "string" && props.defaultValue !== "";
    const date = props.defaultValue as Date;

    return (
      <DatePicker
        onChange={(e: any) => onChange?.(e)}
        defaultValue={isValue ? dayjs(date) : null}
        slotProps={{
          textField: { ...rest, size: "medium" },
        }}
        format="YYYY-MM-DD"
      />
    );
  }
  if (props.type === "time") {
    delete rest.value;
    delete rest.defaultValue;
    const isValue =
      typeof props.defaultValue === "string" && props.defaultValue !== "";
    const date = props.defaultValue as Date;
    return (
      <TimePicker
        onChange={(e: any) => onChange?.(e)}
        defaultValue={isValue ? dayjs(date) : null}
        slotProps={{
          textField: { ...rest, size: "medium" },
        }}
        format="HH:mm"
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
export type { InputsWithLabelProps };
