import Accordion from "../../../components/Accordion";

function Instructions() {
  return (
    <Accordion title="Entrance Exams Guide">
      <ul className="list-decimal col p-2 px-[1vw] gap-3">
        <li>
          Please check the handbook for the master's programs you are interested
          in and see the exam option that most of your program choices require
        </li>
        <li>You can only train and sit for one of the exams not both</li>
        <li>
          Upon enrollment, establish an MBA or ETS account. Once the training
          concludes, request to schedule the exam by using the request button in
          this module. Only request for an exam booking after the training and
          once you feel comfortable and ready to take the exam
        </li>
        <li>
          Exams are scheduled on Wednesdays every week, so ensure you request
          booking by Tuesday. Before sitting for the exam, carefully read the
          GMAC/ETS email sent to you a few days before the exam date.
        </li>
        <li>
          At your exam center, after completing your exam, designate
          <span> The International Scholars Program</span> as one of the
          institutions to receive your official results. Upload the unofficial
          results in this module, for you to proceed to school admissions.
        </li>
      </ul>
    </Accordion>
  );
}

export default Instructions;
