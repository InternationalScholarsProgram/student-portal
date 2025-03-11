import { useEffect, useRef, useState } from "react";
import { Avatar } from "@mui/material";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';

import { formatDate } from "../../../../../utils/utils";
import SendMessageInput from "./SendMessageInput";
import { BASE_URL } from "../../../../../services/api/base";
import useTickets from "../../../hooks/useTickets";

type Props = {
  messages: any;
  selectedTicket: any;
  queryKey: any;
  toggleModal: () => void;
};

function ChatContainer({
  messages,
  selectedTicket,
  queryKey,
  toggleModal,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const { sendMessage } = useTickets();

  const handleSend = async (text: string) => {
    const payload = {
      ticket_id: selectedTicket?.id,
      message: text,
      attachments: [file],
      queryKey: queryKey,
    };
    const data = await sendMessage.mutateAsync(payload);
    if (data.code === 200) {
      scrollToBottom();
      toggleModal();
    }
  };
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    if (bottomRef?.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <>
      <div className="col flex-1">
        {messages?.map((group: any) => (
          <div key={JSON.stringify(group)} className="col gap-2">
            {group?.created_at && (
              <p className="text-center text-xs">{group.created_at}</p>
            )}
            {group?.messages?.map((chat: any, index: number) =>
              chat.user_type === "1" ? (
                <SupportMessageItem key={index} message={chat} />
              ) : (
                <StudentMessageItem key={index} message={chat} />
              )
            )}
          </div>
        ))}
      </div>
      {selectedTicket?.status?.toLowerCase() !== "closed" && (
        <SendMessageInput
          file={file}
          setFile={setFile}
          handleSend={handleSend}
        />
      )}
      <span ref={bottomRef}></span>
    </>
  );
}

export default ChatContainer;

function StudentMessageItem({ message }: any) {
  return (
    <div className="col self-end gap-2 message-item">
      <div className="student">
        <p>{message?.response}</p>
        <span>{formatDate(message?.created_at, "h:mm a")}</span>
      </div>
      <div className="row">
        <Attachment link={message?.attachment} />
      </div>
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
          <p>{message?.response}</p>
          <span>{formatDate(message?.created_at, "h:mm a")}</span>
        </div>
        <Attachment link={message?.attachment} />
      </div>
    </div>
  );
}

const Attachment = ({ link }: { link: any }) => {
  const attachmentLink = `${BASE_URL}/login/member/dashboard/imgs/tickets/${link}`;
  return (
    link && (
      <div className="row items-center justify-end w-full">
        <SourceOutlinedIcon fontSize="small" />
        <a
          href={attachmentLink}
          target="_blank"
          className="text-sm px-2 text-ellipsis text-nowrap overflow-hidden"
        >
          {link}
        </a>
      </div>
    )
  );
};
