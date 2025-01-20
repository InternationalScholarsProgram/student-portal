import Accordion from "../../../components/Accordion";

export default function LoanGuides({ loan }: { loan: string }) {
  switch (loan) {
    case "Tuition & Living Expenses":
      return (
        <Accordion title="Tuition and Living Expenses Loan Guide">
          <li>
            To start funding processing, you need to submit a funding advisory
            meeting request with our team within this module.
          </li>
          <li>
            During the funding advisory meeting, our team will propose the best
            funding options available to you.
          </li>
          <li>
            You will be able to submit your funding application request within
            this module.
          </li>
          <li>
            Once your funding application is processed by our team, you will
            receive notification in this module, and you should wait until the
            lender's decision to award or reject is received in your email. This
            can take up to two weeks, please be patient.
          </li>
          <li>
            Once approved or denied, you are required to submit the decision
            feedback in <b>this module.</b>
          </li>
          <li>
            Upon receipt of an approval loan letter from the lender, request
            your <b>I-20</b> from the school by following instructions that were
            part of your admission acceptance communication from the school, on
            how to request the same. If your loan is denied, submit another
            funding advisory request with our team.
          </li>
          <li>
            Once you submit your I-20 request to the school, wait for it to be
            processed. Timelines for I-20 processing can vary depending on
            schools' processing policies, so please be patient.
          </li>
          <li>
            Once you have your I-20, please proceed to the next module of visa
            processing.
          </li>
        </Accordion>
      );
    case "Relocation":
      return (
        <Accordion title="Relocation Loan Guide">
          <li>
            To start funding processing, you need to submit a funding advisory
            meeting request with our team within this module.
          </li>
          <li>
            During the funding advisory meeting, our team will analyze your
            request and advise whether to proceed further with the application.
          </li>
          <li>
            You will be able to submit your funding application request within
            this module.
          </li>
          <li>
            Once your funding application is processed by our team, you will
            receive approval notification in this module.
          </li>
          <li>
            Upon approval, you will receive the loan disclosure paperwork within
            this module, which you must sign in order to proceed to the travel
            and logistics module. There, you will be able to request booking of
            your air ticket, accommodation, and manage other relocation
            formalities.
          </li>
        </Accordion>
      );
    case "Alternative Study":
      return (
        <Accordion title="Alternative Study Loan Guide">
          <li>
            To start funding processing, you need to submit a funding advisory
            meeting request with our team within this module.
          </li>
          <li>
            During the funding advisory meeting, our team will analyze your
            request and advise whether to proceed further with the application.
          </li>
          <li>
            You will be able to submit your funding application request within
            this module.
          </li>
          <li>
            Once your funding application is processed by our team, you will
            receive approval notification in this module.
          </li>
          <li>
            Upon approval, you will receive the loan disclosure paperwork within
            this module, which you must sign in order for the funds to be
            disbursed to your bank account.
          </li>
        </Accordion>
      );
    case "Personal":
      return (
        <Accordion title="Personal Loan Guide">
          <li>
            To start funding processing, you need to submit a funding advisory
            meeting request with our team within this module.
          </li>
          <li>
            During the funding advisory meeting, our team will analyze your
            request and advise whether to proceed further with the application.
          </li>
          <li>
            You will be able to submit your funding application request within
            this module.
          </li>
          <li>
            Once your funding application is processed by our team, you will
            receive approval notification in this module.
          </li>
          <li>
            Upon approval, you will receive the loan disclosure paperwork within
            this module, which you must sign in order for the funds to be
            disbursed to your bank account.
          </li>
        </Accordion>
      );
    default:
      return "Tuition & Living Expenses";
  }
}
