import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

function WebMail() {
  useEffect(() => {
    window.location.href = "https://internationalscholarsprogram.com/webmail";
  }, []);

  return <CircularProgress />;
}

export default WebMail;
