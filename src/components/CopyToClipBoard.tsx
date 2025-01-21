import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import ToolTip from "./ToolTip";
import { useState } from "react";

function CopyToClipBoard({ text }: { text: string }) {
  const [title, setTitle] = useState("Copy to clipboard");

  const handleSaveToClipboard = async () => {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      console.error("Clipboard API is not available");
      setTitle("Clipboard not supported");
      setTimeout(() => setTitle("Copy to clipboard"), 2000);
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setTitle("Copied");
      const timer = setTimeout(() => setTitle("Copy to clipboard"), 2000);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Failed to copy text: ", error);
      setTitle("Failed to copy");
      setTimeout(() => setTitle("Copy to clipboard"), 2000);
    }
  };

  return (
    <ToolTip
      onClick={handleSaveToClipboard}
      title={title}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleSaveToClipboard();
      }}
    >
      <ContentCopyOutlinedIcon fontSize="small" />
    </ToolTip>
  );
}

export default CopyToClipBoard;
