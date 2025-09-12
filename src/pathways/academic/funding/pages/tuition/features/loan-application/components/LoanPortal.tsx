import React from "react";
import CopyToClipBoard from "../../../../../../../../components/CopyToClipBoard";

const LoanPortal: React.FC<{
  link: string;
  userName: string;
  password: string;
}> = ({ link, userName, password }) => {
  return (
    <div>
      <p>Access the loan portal using the following details:</p>
      <div className="px-4 m-2 w-fit border-30 rounded-md">
        <a className="text-primary-light underline" href={link} target="_blank">
          Portal Link
        </a>
        <p>
          User ID/Email : {userName} <CopyToClipBoard text={userName} />
        </p>
        <p>
          Password : {password} <CopyToClipBoard text={password} />
        </p>
      </div>
    </div>
  );
};

export default LoanPortal;
