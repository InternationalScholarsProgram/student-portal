import { useState } from "react";
import Modal from "../../../../../components/Modal";
import { formatDate } from "../../../../../utils/utils";
import useVisa from "../../../services/hooks/useVisa";
import { useQuery } from "@tanstack/react-query";
import visaEndpoints from "../../../services/visaEndpoints";
import GridTable from "../../../../../components/tables/GridTable";
import FormFooterBtns from "../../../../../components/buttons/FormFooterBtns";
import Loader from "../../../../../components/loaders/Loader";
import SevisFeesPayment from "../../../components/payments/SevisFeesPayment";

function GradedMock() {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);

  const { visa, user } = useVisa();

  const { data: mockQuestions = [], isLoading } = useQuery<MockQuestion[]>({
    queryKey: [user?.email, "mock-interview-questions"],
    queryFn: () => visaEndpoints.getMockQuestions(visa?.stu_id),
    enabled: Boolean(visa?.mockDateAndTime && open),
  });
  const total = mockQuestions?.reduce((acc, item) => acc + item.marks, 0);
  return (
    <>
      <h3 className="title-sm">Completed your mock interview</h3>
      <div className="col gap- p-3 card">
        <p>
          You successfully participated in the mock visa interview that was
          scheduled on{" "}
          <em>
            {formatDate(visa?.mockDateAndTime, "dddd, MMMM D, YYYY, h:mm A")}
          </em>
        </p>
        <div className="col">
          <b className="my-2">Mock Interview Feedback</b>
          <p>
            Your average score is
            <b className="px-1">{total}</b>%
          </p>
          <p>This is the comment from our team: {visa?.mock_comment}</p>
          <div className="px-3">
            <GridTable
              rows={mockQuestions?.map((item, index) => ({
                ...item,
                id: index + 1,
              }))}
              columns={[
                {
                  field: "id",
                  headerName: "No.",
                },
                { field: "question", flex: 1, headerName: "Question" },
                { field: "marks", headerName: "Your Score" },
                {
                  field: "maxScore",
                  headerName: "Max Score",
                  valueGetter: () => 100 / mockQuestions?.length,
                },
              ]}
              name="Mock Interview Feedback"
            />
          </div>
        </div>
        <div className="row justify-end gap-2">
          <button className="primary-btn" onClick={toggleModal}>
            Request SEVIS fee payment
          </button>
        </div>
      </div>
      <Modal
        open={open}
        setOpen={toggleModal}
        title="Request SEVIS fee Payment"
      >
        <div className="modal">
          {total >= 80 ? (
            <SevisFeesPayment toggleModal={toggleModal} />
          ) : (
            <>
              <p>
                Regrettably, you didn't achieve an 80% or higher on your mock
                interview. However, the program will cover your SEVIS fee after
                your real visa interview, once you receive positive feedback
                (whether an approved visa or administrative processing) from
                your country's consulate.
              </p>
              <FormFooterBtns onClose={toggleModal} hideBtn />
            </>
          )}
        </div>
      </Modal>
    </>
  );
}

export default GradedMock;
type MockQuestion = {
  email: string;
  id: number;
  marks: number;
  question: string;
  quiz_id: number;
  visa_interview_id: 124;
};
