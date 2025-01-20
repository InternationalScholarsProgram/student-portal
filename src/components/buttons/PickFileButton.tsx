import { Button } from "@mui/material";
import TopicIcon from "@mui/icons-material/Topic";
import { useState } from "react";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  setFiles?: (file: any) => void;
  text?: string;
  file?: any;
}

function PickFileButton({ setFiles, text, file, ...props }: Props) {
  const [pickedFile, setPickedFile] = useState<any>(null);
  return (
    <div className="row items-center gap-2">
      <Button
        variant="outlined"
        component="label"
        size="small"
        sx={{
          overflowX: "clip",
          display: "flex",
          flexWrap: "nowrap",
          flexDirection: "row",
          gap: "2px",
          alignItems: "center",
          justifyContent: "flex-start",
          color: "primary.light",
        }}
      >
        <input
          {...props}
          hidden
          type="file"
          accept={props.accept || ".pdf, .doc, .docx, .txt,"}
          onChange={(e: any) => {
            props.onChange?.(e);
            if (setFiles) setFiles(e.target.files[0]);
            setPickedFile(e.target.files[0]);
          }}
        />
        <TopicIcon fontSize="small" />
        <p className="text-nowrap text-sm">{text ? text : "Choose file"}</p>
      </Button>

      <p className="flex-1 text-nowrap text-sm truncate">
        {file?.name || pickedFile?.name}
      </p>
    </div>
  );
}

export default PickFileButton;
