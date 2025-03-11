import { formatDate } from "../../../../../utils/utils";
import useVisa from "../../../services/hooks/useVisa";
import GridTable from "../../../../../components/tables/GridTable";
import ContentComponent from "../../../../../components/ContentComponent";

function GradedMock() {
  const { visa, mockQuestions, mockTotalMarks } = useVisa();

  return (
    <ContentComponent header="Completed your mock interview">
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
          <b className="px-1">{mockTotalMarks}</b>%
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
    </ContentComponent>
  );
}

export default GradedMock;
