import { useQuery } from "@tanstack/react-query";
import Modal from "../../../../../components/Modal";
import Chat from "./Chat";
import api from "../../../../../services/api/base";
import Loader from "../../../../../components/loaders/Loader";
import { getTicketsUrl } from "../../../components/utils";

type Props = {
  open: boolean;
  selectedTicket: any;
  toggleModal: () => void;
};

function ViewTicketModal({ open, toggleModal, selectedTicket }: Props) {
  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages", selectedTicket?.id],
    queryFn: async () => {
      const response = await api.get(
        `${getTicketsUrl}action=chat_messages&ticket_id=${selectedTicket?.id}`
      );
      return response.data.data;
    },
    enabled: !!selectedTicket?.id,
  });

  // Function to group messages by date
  const groupMessagesByDate = (messageList: any[]) => {
    const groupedMessages: any[] = [];
    let currentDate: any = null;

    if (!messageList || messageList.length === 0)
      return [
        {
          created_at: "Today",
          messages: [
            {
              attachment: selectedTicket?.img || null,
              created_at: selectedTicket?.ticket_date,
              id: selectedTicket?.id,
              response: selectedTicket?.issue,
              user_type: "2",
            },
          ],
        },
      ];

    messageList?.forEach((message: any) => {
      const messageDate = new Date(message?.created_at).toDateString();
      const today = new Date().toDateString();
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
    console.log(groupedMessages);
    return groupedMessages;
  };
  return (
    <Modal open={open} setOpen={toggleModal} title="View Ticket">
      <div className="modal ">
        {messages && !isLoading ? (
          <Chat messages={groupMessagesByDate(messages)} />
        ) : (
          <Loader />
        )}
        {/* <Chat messages={groupMessagesByDate(sampleChat)} /> */}
      </div>
    </Modal>
  );
}

export default ViewTicketModal;
const sampleChat = [
  {
    userType: 1,
    created_at: "2025-01-25T09:00:00",
    response: "Hello, how are you?",
  },
  {
    userType: 2,
    created_at: "2025-01-25T09:05:00",
    response: "Hello, I'm fine, how about you?",
  },
  {
    userType: 1,
    created_at: "2025-01-25T09:10:00",
    response: "How are you doing?",
  },
  {
    userType: 2,
    created_at: "2025-01-25T09:15:00",
    response: "I am fine",
  },
  {
    userType: 1,
    created_at: "2025-01-26T14:00:00",
    response: "What are you up to today?",
  },
  {
    userType: 2,
    created_at: "2025-01-26T14:05:00",
    response: "Just working on some projects. You?",
  },
  {
    userType: 1,
    created_at: "2025-01-27T10:00:00",
    response: "Same here, trying to finish my tasks.",
  },
  {
    userType: 2,
    created_at: "2025-01-27T10:10:00",
    response: "Good luck with that!",
  },
];
