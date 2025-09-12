import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";

function CheckBox(props: CheckboxProps) {
  const { title, sx, ...others } = props;
  return (
    <FormControlLabel
      label={title}
      sx={sx}
      control={
        <Checkbox
          {...others}
          sx={{
            "&.Mui-checked": {
              color: "primary.main",
            },
          }}
        />
      }
    />
  );
}

export default CheckBox;
