import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select as MuiSelect, SelectProps } from "@mui/material";

export default function Select({ ...props }: SelectProps) {
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
      <MuiSelect {...props}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {props.children}
      </MuiSelect>
    </FormControl>
  );
}
