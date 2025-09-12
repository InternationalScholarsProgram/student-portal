import React from "react";
import { formatDateAndTime } from "../../../../utils/utils";

const NextStepInfo: React.FC<{ visaDate: string | Date }> = ({ visaDate }) => {
  return (
    <p className="alert italic my-2">
      Please ensure you submit your transcript highlighting the outcome
      immediately your attend the visa interview scheduled on{" "}
      {formatDateAndTime(visaDate)}
    </p>
  );
};

export default NextStepInfo;
