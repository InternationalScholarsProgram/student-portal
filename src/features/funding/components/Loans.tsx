import PrimaryBtn from "../../../components/buttons/PrimaryBtn";

export const loanTypes = [
  "Tuition & Living Expenses",
  "Relocation",
  "Alternative Study",
  "Personal",
];

export default function Loans({ loan }: { loan: string }) {
  switch (loan) {
    case "Tuition & Living Expenses":
      return (
        <section>
          <p>
            The tuition and living expenses funding is needed for you to request
            your I-20 from the school you have been admitted to. This loan is
            sourced from our external lending partners. Once approved, the
            funding will ultimately support your studies in North America. You
            MUST request a funding advisory meeting to proceed with this funding
            option by clicking the button above.
          </p>
        </section>
      );
    case "Relocation":
      return (
        <section className="">
          <p>
            Our relocation loan product is meant to cover the many expenses
            incurred in the process of relocating to North America through the
            program. Only regular option students in good standing are eligible
            for this facility. You start repaying this loan 6 months after
            issuance, for 24 months. Interest rate for this loan is 1% per month
            reducing balance.
          </p>
          <PrimaryBtn btnstyles="self-end w-fit" onClick={() => {}}>
            Proceed to Relocation Loan
          </PrimaryBtn>
        </section>
      );
    case "Alternative Study":
      return (
        <section>
          <p>
            Even though we have our official lending partners who take care of
            the cost of tuition fees and living expenses, sometimes it may be
            necessary to seek more tuition fees funding from the program due to
            unforeseen circumstances. This loan product is meant to take care of
            that. All members who are in good standing are eligible for this
            facility. You start repaying this loan 6 months after issuance, for
            24-60 months, depending on the amount of loan requested. Interest
            rate for this loan is 1% per month reducing balance.
          </p>

          <PrimaryBtn onClick={() => {}}>Proceed to Study Loan</PrimaryBtn>
        </section>
      );
    case "Personal":
      return (
        <section>
          <p>
            We all have those rainy days! Our personal loan product is meant to
            cater for any personal emergency needs that may arise while studying
            or working in North America. All members who are in good standing
            are eligible for this facility. You start repaying this loan 1 month
            after issuance, for 6 months. Interest rate for this loan is 1% per
            month reducing balance.
          </p>

          <PrimaryBtn
            onClick={() => {
              "personal_loan.php";
            }}
          >
            Proceed to Personal Loan
          </PrimaryBtn>
        </section>
      );
    default:
      return "Tuition & Living Expenses";
  }
}
