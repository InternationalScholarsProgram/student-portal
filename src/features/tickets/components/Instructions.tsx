import PrimaryBtn from "../../../components/buttons/PrimaryBtn";

function Instructions({ toogleInstructions }: any) {
  return (
    <div className="col px-4">
      <h3 className="py-4 px-2 borders-30">
        Please read these Instructions carefully before creating a ticket
      </h3>
      <ul className="list-decimal col p-4 gap-3 opacity-80">
        <li>
          Always explain your concern in detail. Not providing details will
          result in the technical support team asking questions to understand
          your concern, thus prolonging the issue.
        </li>
        <li>
          When your ticket takes longer than expected, always send a message in
          the same ticket requesting attention: "Please attend to my concern."
        </li>
        <li>
          A ticket being in progress doesn't mean it's not being attended to;
          always check for feedback from the technical team by opening the
          ticket.
        </li>
        <li>
          Always include screenshots where necessary, especially if your concern
          is more technical than a general guidance issue.
        </li>
        <li>Close all tickets once your issue has been addressed.</li>
        <li>All tickets are usually resolved within 24 hours.</li>
      </ul>
      <PrimaryBtn btnstyles="self-end" onClick={toogleInstructions}>
        Create Ticket
      </PrimaryBtn>
    </div>
  );
}

export default Instructions;
