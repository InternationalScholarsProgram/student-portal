import { useState } from "react";
import Accordion from "../../../../components/Accordion";

function TrainingGuide() {
  const [expanded, setExpanded] = useState(true);
  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      title="Training Resources Guide"
      label
    >
      <li>
        The visa interview transcripts provided to you represent the feedback
        for the most recent real-case student experiences at the US consulate.
        This experience constantly changes depending on the circumstances at the
        embassy, and these visa interview transcripts capture the most current
        trend.
      </li>
      <li>
        The visa training videos are prepared to give you insights on the
        expectations of the visa interview at the US embassy.
      </li>
      <li>
        You will only be permitted to read each visa interview transcript and
        see each visa training video once. When you open a resource, make sure
        you read or watch it through to the end. Clicking on Next will load the
        next resource.
      </li>
      <li>
        Once you have gone through all of the resources, they will be disabled
        and you will no longer have access to them.
      </li>
      <li>
        Before requesting a mock visa interview, please ensure you go through
        all the visa interview transcripts and visa training videos. Your mock
        interview will be graded based on your performance. The resources will
        help you prepare for both the mock and real visa interviews.
      </li>
      <p className="border-l-4 border-primary-main p-3">
        Note: It is mandatory to request and attend the mock visa interview. You
        are required to score at least 80% in your mock visa interview for the
        Program to pay your SEVIS fee.
      </p>
    </Accordion>
  );
}

export default TrainingGuide;
