import React from "react";
import MapFormFields from "../../../components/inputs/MapFormFields";
import FormFooterBtns from "../../../components/buttons/FormFooterBtns";
import { useMutation } from "@tanstack/react-query";
import examsEndpoints from "../services/examsEndpoints";
import { toast } from "react-toastify";
import { errorMsg } from "../../../components/errors/errorMsg";
import Modal from "../../../components/Modal";
import PrimaryBtn from "../../../components/buttons/PrimaryBtn";

type Props = {
  invalidateStatus: () => void;
  enrollmentId: string;
};

const ExamBookingModal: React.FC<Props> = ({
  invalidateStatus,
  enrollmentId,
}) => {
  const [open, setOpen] = React.useState(false);
  const toggleModal = () => setOpen(!open);
  const book = useMutation({
    mutationFn: examsEndpoints.bookExam,
    onSuccess: () => {
      toast.success("Booked successfully.");
      invalidateStatus();
      toggleModal();
    },
    onError: (error) => toast.error(errorMsg(error)),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("enrollment_id", enrollmentId);
    book.mutate(formData);
  };

  return (
    <>
      <PrimaryBtn onClick={toggleModal} className="self-end">
        Request Booking
      </PrimaryBtn>
      <Modal open={open} setOpen={toggleModal} title="Request Exam Booking">
        <form onSubmit={onSubmit} className="modal gap-2">
          <MapFormFields fields={formFields} />
          <FormFooterBtns
            onClose={toggleModal}
            btnText={book.isPending ? "Requesting..." : "Request Booking"}
          />
        </form>
      </Modal>
    </>
  );
};

export default ExamBookingModal;

const formFields = [
  {
    name: "proposed_exam_date_one",
    type: "date",
    required: true,
    label: "Your Preferred Exam Date",
  },
  {
    name: "proposed_exam_date_two",
    type: "date",
    required: true,
    label: "Your Second Preferred Exam Date",
  },
  {
    name: "proposed_exam_date_three",
    type: "date",
    required: true,
    label: "Your Third Preferred Exam Date",
  },
  {
    name: "preferred_time_of_day",
    type: "select", // use select for fixed choices
    required: true,
    label: "Preferred Time of Day",
    options: ["Morning", "Afternoon", "Evening"],
  },
  {
    name: "country",
    type: "country",
    required: true,
    label: "Country",
  },
  {
    name: "exam_center",
    type: "text",
    required: true,
    label: "Preferred exam center name/location",
  },
];
