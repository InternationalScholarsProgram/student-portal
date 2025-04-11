import React from "react";
import LetterHead from "../../../../../../components/letters/LetterHead";
import Modal from "../../../../../../components/Modal";
import Address from "../../../../../../components/letters/Address";
import useFetchUser from "../../../../../../services/hooks/useFetchUser";
import FormFooterBtns from "../../../../../../components/buttons/FormFooterBtns";
import BobSignatory from "../../../../../../components/letters/BobSignatory";
import { generatePdf } from "../../../../../../utils/utils";

const OfferLetter = ({ loan = 0 }) => {
  const { user } = useFetchUser();
  const [open, setOpen] = React.useState(false);
  const toggleModal = () => setOpen(!open);
  const targetRef = React.useRef(null);

  const download = async () => {
    if (targetRef?.current) {
      const pdf = await generatePdf("OfferLetter", targetRef.current, false);
      pdf.instance.save();
    }
  };

  return (
    <>
      <span
        onClick={toggleModal}
        className="cursor-pointer title-sm text-primary-light underline"
      >
        Offer Letter
      </span>
      <Modal open={open} setOpen={toggleModal} title="Offer Letter">
        <div className="modal">
          <div ref={targetRef} className="col w-full">
            <LetterHead />
            <Address />
            <article className="py-3 col gap-2">
              <b className="underline uppercase">
                RE: Loan Approval Confirmation
              </b>
              <p>Dear {user?.fullnames}</p>
              <p>
                Congratulations! Your application for a relocation student loan
                with The International Scholars Program has been approved.
              </p>
              <p>
                I am confirming that the approved loan amount is{" "}
                <b>USD {loan}</b> This loan will be finalized upon verification
                of your visa approval.{" "}
              </p>
              <p>
                The loan covers all the expenses that you incurred in the
                relocation process to America, less the amount you contributed
                to the program. Any pocket money available after deducting all
                the expenses will be disbursed directly to your US bank account.
                Should you require any further information, please feel free to
                contact our team or submit a ticket through your student portal.
              </p>
            </article>
            <BobSignatory />
          </div>
          <FormFooterBtns
            onClose={toggleModal}
            onSubmit={download}
            btnText="Download"
          />
        </div>
      </Modal>
    </>
  );
};

export default OfferLetter;
