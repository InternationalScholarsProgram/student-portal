import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, InputAdornment } from "@mui/material";
import InputField from "../../../../../components/inputs/InputField";
import { useState } from "react";
type Props = {
  setFile: any;
  file?: any;
  handleSend: (value: string) => void;
};
function SendMessageInput({ setFile, file, handleSend }: Props) {
  const [input, setInput] = useState<string>("");
  return (
    <div className="col gap-2 w-full px-2 my-2">
      {file?.name && (
        <div className="row gap-2">
          <p className="bg-paper w-fit m-1 p-1">File Name: {file?.name}</p>
          <button
            type="button"
            className="opacity-50 border-30 aspect-square hover:opacity-75 hover:outline-2 rounded-full text-sm h-fit"
            aria-label="Close"
            onClick={() => setFile(null)}
          >
            ✕
          </button>
        </div>
      )}
      <InputField
        placeholder="Type your message here"
        type="text"
        label="Message"
        fullWidth
        onChange={(e) => setInput(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <label>
                    <input
                      hidden
                      type="file"
                      accept=".png,.jpeg,.jpg ,.pdf, .doc, .docx, .txt,"
                      onChange={(e: any) => setFile(e.target.files[0])}
                    />
                    <AttachFileIcon fontSize="small" />
                  </label>
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => handleSend(input)}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </div>
  );
}

export default SendMessageInput;
