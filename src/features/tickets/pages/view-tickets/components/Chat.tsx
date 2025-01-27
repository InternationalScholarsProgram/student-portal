import { Avatar } from "@mui/material";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { useState } from "react";

import { formatDate } from "../../../../../utils/utils";
import SendMessageInput from "./SendMessageInput";

function StudentMessageItem({ message }: any) {
  return (
    <div className="student">
      <p>{message}</p>
      <span>{formatDate(new Date(), "h:mm a")}</span>
    </div>
  );
}
function SupportMessageItem({ message }: any) {
  return (
    <div className="row gap-2">
      <Avatar sx={{ width: 35, height: 35 }} className="aspect-square">
        <SupportAgentOutlinedIcon />
      </Avatar>
      <div className="col">
        <div className="support">
          <p>{message}</p>
          <span>{formatDate(new Date(), "h:mm a")}</span>
        </div>
        <Attachment name="Receipt.pdf" />
      </div>
    </div>
  );
}

const Attachment = ({ name }: { name: any }) => (
  <p className="text-sm">{name}</p>
);
function Chat({ messages }: any) {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="chat-container">
      {messages?.map((group: any) => (
        <div key={JSON.stringify(group)} className="col gap-2">
          {group?.created_at && (
            <p className="text-center text-xs">{group.created_at}</p>
          )}
          {group?.messages?.map((chat: any, index: number) =>
            chat.user_type === "1" ? (
              <SupportMessageItem key={index} message={chat.response} />
            ) : (
              <StudentMessageItem key={index} message={chat.response} />
            )
          )}
        </div>
      ))}
      <SendMessageInput file={file} setFile={setFile} />
    </div>
  );
}

export default Chat;
