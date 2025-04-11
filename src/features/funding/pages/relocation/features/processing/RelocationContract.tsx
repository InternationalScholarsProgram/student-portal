import React, { useState } from "react";
import Modal from "../../../../../../components/Modal";
import LetterHead from "../../../../../../components/letters/LetterHead";
import Address from "../../../../../../components/letters/Address";
import useFetchUser from "../../../../../../services/hooks/useFetchUser";
import { generatePdf } from "../../../../../user/contracts/utils/utils";
import FormFooterBtns from "../../../../../../components/buttons/FormFooterBtns";
import BobSignatory from "../../../../../../components/letters/BobSignatory";
import PrimaryBtn from "../../../../../../components/buttons/PrimaryBtn";
import useRelocation from "../../services/useRelocation";
import { formatDate } from "../../../../../../utils/utils";

const RelocationContract = () => {
  const { user } = useFetchUser();
  const { relocationStatus } = useRelocation();
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  const targetRef = React.useRef(null);
  const loan = relocationStatus?.loan;
  const application = relocationStatus?.application;

  const download = () => {
    if (targetRef?.current) generatePdf("OfferLetter", targetRef.current);
  };
  return (
    <>
      <PrimaryBtn onClick={toggleModal} className="self-end">
        Sign Contract
      </PrimaryBtn>
      <Modal title="Relocation Contract" open={open} setOpen={toggleModal}>
        <div className="w-[95vw] md:w-[80vw] xl:w-[70vw] h-[80vh] p-2">
          <div ref={targetRef} className="col w-full">
            <LetterHead />
            <Address email=" " />
            <article className="py-3 col gap-2">
              <b className="underline uppercase">
                RE: Relocation Loan Contract
              </b>
              <p>Personal Details</p>
              <table className="data-table">
                <div>
                  <p>Applicant’s Name</p>
                  <p>{loan?.fullnames}</p>
                </div>
                <div>
                  <p>Membership Number</p>
                  <p>{user?.member_no}</p>
                </div>
                <div>
                  <p>Social Security Number</p>
                  <p>{application?.ssn_number || "N/A"}</p>
                </div>
                <div>
                  <p>Passport Number</p>
                  <p>{application?.passport_number}</p>
                </div>
                <div>
                  <p>Date of birth</p>
                  <p>{formatDate(application?.date_of_birth)}</p>
                </div>
                <div>
                  <p>University Attending</p>
                  <p>{loan?.fullnames}</p>
                </div>
                <div>
                  <p>Current US Address</p>
                  <p>{application?.usa_address}</p>
                </div>
              </table>
            </article>
            <BobSignatory />
          </div>
          <FormFooterBtns onClose={toggleModal} btnText="Download" />
        </div>
      </Modal>
    </>
  );
};

export default RelocationContract;
const applicantsDetails = (data: any) => ({
  personalDetails: {},
});
