import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";

function CheckBox(props: CheckboxProps) {
  const { title, ...others } = props;
  return (
    <FormControlLabel
      label={title}
      // sx={{ alignItems: "flex-start" }}
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
