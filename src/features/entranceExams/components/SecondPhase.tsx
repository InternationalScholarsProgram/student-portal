import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import { useState } from "react";

function SecondPhase() {
  const [mockStatus, setMockStatus] = useState("pending");
  return (
    <div>
      <p>
        This is the test phase. You will be doing the various mocks and
        submitting them for review.
      </p>
      {mockStatus === "pending" && (
        <div className="bg-paper borde border-primary-main/45 rounded-lg col m-5 p-3 gap-3">
          <div className="row-center w-fit gap-2">
            <HourglassBottomOutlinedIcon />
            <p>Mock 2 Received</p>
          </div>
          <span>Please wait while your submission is being reviewed.</span>
        </div>
      )}
    </div>
  );
}

export default SecondPhase;
