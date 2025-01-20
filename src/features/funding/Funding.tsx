import { useState } from "react";
import LoanGuides from "./components/LoanGuides";
import Loans, { loanTypes } from "./components/Loans";

function Funding() {
  const [show, setShow] = useState(loanTypes[0]);
  return (
    <main className="">
      <h3 className="text-center text-3xl">Loans</h3>
      <div className="w-full py-3 col justify-center">
        <section className="card w-full py-3 col justify-center">
          <ul className="ul-links">
            {loanTypes.map((tab) => (
              <button
                className={tab === show ? "selected" : ""}
                key={tab}
                onClick={() => setShow(tab)}
              >
                {tab}
              </button>
            ))}
          </ul>
          <div className="funding-details">
            <LoanGuides loan={show} />
            <p className="text-primary-light font-semibold text-xl my-5">
              Loan Details
            </p>
            <Loans loan={show} />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Funding;
