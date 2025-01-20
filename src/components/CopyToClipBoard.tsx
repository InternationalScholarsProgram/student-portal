import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import ToolTip from "./ToolTip";
import { useState } from "react";

function CopyToClipBoard({ text }: { text: string }) {
  const [title, setTitle] = useState("Copy to clipboard");
  const handleSaveToClipboard = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text);
    setTitle("Copied");
    setTimeout(() => setTitle("Copy to clipboard"), 2000);
  };
  return (
    <ToolTip onClick={handleSaveToClipboard} title={title}>
      <ContentCopyOutlinedIcon />
    </ToolTip>
  );
}

export default CopyToClipBoard;
