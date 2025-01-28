import { useQuery } from "@tanstack/react-query";
import Modal from "../../../../../components/Modal";
import api from "../../../../../services/api/base";
import Loader from "../../../../../components/loaders/Loader";
import { getTicketsUrl } from "../../../components/utils";
import { capitalizeFirstCharacter } from "../../../../../utils/utils";
import ChatContainer from "./ChatContainer";
import { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  selectedTicket: any;
  toggleModal: () => void;
};

function ViewTicketModal({ open, toggleModal, selectedTicket }: Props) {
  const queryKey = ["messages", selectedTicket?.id];
  const { data: messages, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await api.get(
        `${getTicketsUrl}action=chat_messages&ticket_id=${selectedTicket?.id}`
      );
      return response.data.data;
    },
    enabled: !!selectedTicket?.id,
  });

  return (
    <Modal
      open={open}
      setOpen={toggleModal}
      title={`Ticket Category : ${capitalizeFirstCharacter(
        selectedTicket?.category
      )}`}
    >
      <div className="w-[90vw] md:w-[60vw] xl:w-[40vw] col flex-wrap overflow-clip p-3 min-h-[50vh]">
        <div className="chat-container">
          {messages && !isLoading ? (
            <ChatContainer
              messages={groupMessagesByDate(messages, selectedTicket)}
              selectedTicket={selectedTicket}
              queryKey={queryKey}
              toggleModal={toggleModal}
            />
          ) : (
            <Loader />
          )}
        </div>
        <footer className="border-t-30 row justify-end px-3 pt-2 mt-3">
          <button onClick={toggleModal} className="text-btn">
            Close
          </button>
        </footer>
      </div>
    </Modal>
  );
}

export default ViewTicketModal;

// Function to group messages by date
const groupMessagesByDate = (messageList: any[], selectedTicket?: any) => {
  const groupedMessages: any[] = [];
  let currentDate: any = null;
  const today = new Date().toDateString();
  const ticketDate = new Date(selectedTicket?.ticket_date).toDateString();
  const firstMessage = {
    created_at: ticketDate === today ? "Today" : ticketDate,
    messages: [
      {
        attachment: selectedTicket?.img || null,
        created_at: ticketDate,
        id: selectedTicket?.id,
        response: selectedTicket?.issue,
        user_type: "2",
      },
    ],
  };
  // groupedMessages.push(firstMessage);
  const list = [...firstMessage.messages, ...messageList];
  list?.forEach((message: any) => {
    const messageDate = new Date(message?.created_at).toDateString();
    if (messageDate !== currentDate) {
      groupedMessages.push({
        created_at: today === messageDate ? "Today" : messageDate,
        messages: [message],
      });
      currentDate = messageDate;
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(message);
    }
  });

  return groupedMessages;
};
