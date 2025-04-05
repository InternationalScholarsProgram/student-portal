import React from "react";
import { InputsWithLabel, InputsWithLabelProps } from "./InputField";
type Props = {
  document: InputsWithLabelProps;
  description: InputsWithLabelProps;
};

const FileWithDescription: React.FC<Props> = ({ document, description }) => {
  const [fileDescription, setFileDescription] = React.useState("");
  const [file, setFile] = React.useState("");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-10">
      <InputsWithLabel
        {...description}
        type="text"
        onChange={(e) => setFileDescription(e.target.value)}
        required={file && fileDescription.length === 0 ? true : false}
        error={file && fileDescription.length === 0 ? true : false}
        helperText={
          file && fileDescription.length === 0
            ? "Please provide a short description for the uploaded file"
            : ""
        }
      />
      <InputsWithLabel
        {...document}
        type="file"
        onChange={(e: any) => setFile(e.target.files?.[0]?.name)}
        required={!file && fileDescription.length > 0 ? true : false}
        error={!file && fileDescription.length > 0 ? true : false}
        helperText={
          fileDescription.length > 0
            ? "If you’ve written a description, don’t forget to upload the related file"
            : ""
        }
      />
    </div>
  );
};

export default FileWithDescription;
