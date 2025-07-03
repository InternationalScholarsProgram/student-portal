import { Button } from "@mui/material";
import TopicIcon from "@mui/icons-material/Topic";
import { useState } from "react";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  setFiles?: (file: any) => void;
  text?: string | React.ReactNode;
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
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 1,
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
            const _file = e.target.files;
            if (_file) {
              if (setFiles) setFiles(_file[0]);
              setPickedFile(_file[0]);
            }
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
