import { useLocation } from "react-router";
import Accordion from "../../../components/Accordion";
import { useMemo } from "react";

export default function LoanGuides() {
  const location = useLocation();
  const loanType = useMemo(
    () => location.pathname.split("/")?.[1],
    [location.pathname]
  );
  switch (loanType) {
    case "tuition":
      return (
        <Accordion title="Tuition and Living Expenses Loan Guide">
          <p>
            Securing tuition and living expenses funding is a crucial step in
            requesting your I-20 from the school to which you have been
            admitted. This funding is sourced through our external lending
            partners and once approved, will support your studies in North
            America. To proceed with this funding option, you must request a
            funding advisory meeting by clicking the button above.
          </p>

          <p>Please carefully follow the steps outlined below:</p>

          <li>
            <b>Submit a Funding Advisory Meeting Request:</b>
            <br />
            To initiate the funding process, you must submit a funding advisory
            meeting request with our team through this module.
          </li>
          <li>
            <b>Attend the Funding Advisory Meeting:</b>
            <br />
            During your advisory meeting, our team will propose the best
            available funding options based on your profile and needs.
          </li>
          <li>
            <b>Submit Your Funding Application:</b>
            <br />
            After the meeting, you will be able to submit your funding
            application request within this module.
          </li>
          <li>
            <b>Await Funding Application Processing and Decision:</b>
            <br />
            Once your application is processed by our team, you will receive a
            notification within the module. You must then wait for the lender's
            decision, which will be communicated to you via email.
            <br />
            <i>
              Please note: This process can take up to two weeks. We appreciate
              your patience.
            </i>
          </li>
          <li>
            <b>Submit Decision Feedback:</b>
            <br />
            Upon receiving either an approval or denial decision from the
            lender, you are required to submit the decision feedback within this
            module.
          </li>
          <li>
            <b>Request Your I-20:</b>
            <br />
            If your loan is approved, request your I-20 from your school by
            following the specific instructions provided in your admission
            acceptance communication.
            <br />
            If your loan is denied, please submit another funding advisory
            meeting request with our team to explore alternative funding
            options.
          </li>
          <li>
            <b>Await I-20 Processing:</b>
            <br />
            Once you have submitted your I-20 request to your school, please
            allow time for processing. Timelines for I-20 issuance may vary
            depending on each school’s policies, so your patience is
            appreciated.
          </li>
          <li>
            <b>Proceed to Visa Processing:</b>
            <br />
            Once you have received your I-20, you may proceed to the next module
            for visa processing.
          </li>
        </Accordion>
      );
    case "relocation":
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
    case "alternative":
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
    case "personal":
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
  }
}
