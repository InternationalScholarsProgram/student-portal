import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";
import { Alert } from "@mui/material";

export function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

export default function SnackbarSlide({
  state,
  message,
  duration,
  severity,
}: any) {
  const [_state, setState] = React.useState(state);
  const handleClick = () => setState(true);
  const handleClose = () => setState(false);

  return (
    <div>
      <Button onClick={handleClick}>Slide Transition</Button>
      <Snackbar
        open={_state}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        key={"SLIDE"}
        autoHideDuration={duration || 2000}
      >
        <Alert
          severity={severity || "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
