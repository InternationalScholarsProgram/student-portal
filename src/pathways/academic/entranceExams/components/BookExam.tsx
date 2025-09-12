import React, { useState } from "react";
import Modal from "../../../../components/Modal";
import MapFormFields from "../../../../components/inputs/MapFormFields";
import FormFooterBtns from "../../../../components/buttons/FormFooterBtns";
import { useMutation } from "@tanstack/react-query";
import examsEndpoints from "../services/examsEndpoints";
import { toast } from "react-toastify";
import PrimaryBtn from "../../../../components/buttons/PrimaryBtn";
type Props = { enrollment_id: string; invalidate: () => void };

const BookExam: React.FC<Props> = ({ enrollment_id, invalidate }) => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("enrollment_id", enrollment_id);
    book.mutate(formData);
  };

  const book = useMutation({
    mutationFn: examsEndpoints.bookExam,
    onSuccess: () => {
      toast.success("Booked successfully.");
      toggleModal();
      invalidate();
    },
  });
  return (
    <div>
      <PrimaryBtn onClick={toggleModal}>Book Exam</PrimaryBtn>
      <Modal open={open} setOpen={toggleModal} title="Request Exam Booking">
        <div className="modal">
          <form onSubmit={handleSubmit}>
            <MapFormFields
              fields={formFields.map((field) => ({ ...field, required: true }))}
            />
            <FormFooterBtns
              onClose={toggleModal}
              btnText={book.isPending ? "Booking..." : "Request Booking"}
            />
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default BookExam;

const formFields = [
  { name: "proposed_exam_date_one", label: "Proposed Exam Date", type: "date" },
  { name: "proposed_exam_date_two", type: "date", label: "Proposed Exam Date" },
  {
    name: "proposed_exam_date_three",
    type: "date",
    label: "Proposed Exam Date",
  },
  {
    name: "preferred_time_of_day",
    type: "time",
    label: "Preferred Time of Day",
  },
  { name: "country", type: "text", label: "Country" },
  { name: "exam_center", type: "text", label: "Exam Center" },
];
