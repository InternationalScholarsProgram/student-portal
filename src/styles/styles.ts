import { SxProps } from "@mui/material";

export const inputStyles: SxProps = {
  // backgroundColor: "primary.main",
  "& input:-webkit-autofill": {
    // WebkitBoxShadow: "0 0 0 100px transparent inset", // Change '#fff' to your desired background color
    // WebkitTextFillColor: "primary.main", // Change '#000' to your desired text color
  },
  "& .MuiFormHelperText-root": {
    padding: "0px",
    margin: "0px",
    width: "100%",
    textAlign: "right",
  },
  "& .MuiOutlinedInput-root:focus-within": {
    outline: "0px dotted white",
    outlineColor: "#032CA600",
  },
  "& .MuiOutlinedInput-root": {
    borderColor: "primary.main",
    outlineColor: "#032CA600",
    "&.Mui-focused fieldset": {
      borderColor: "primary.main",
      outlineColor: "primary.main",
    },
  },
};
