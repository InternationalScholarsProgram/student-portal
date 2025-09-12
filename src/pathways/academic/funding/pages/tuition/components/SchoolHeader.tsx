import React from "react";

const SchoolHeader: React.FC<{
  schoolName: string;
  program: string;
  loan: string;
}> = function ({ schoolName, program, loan }) {
  return (
    <div className="alert my-2 text-sm">
      <p className="text-sm">
        <b>Loan Provider</b> : {loan === "MPOWER" ? "MPOWER" : "Sallie Mae"}
      </p>
      <p className="text-sm">
        <b>School</b> : {schoolName}
      </p>
      <p className="text-sm">
        <b>Program</b>: {program}
      </p>
    </div>
  );
};

export default SchoolHeader;
