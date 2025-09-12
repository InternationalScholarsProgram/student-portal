import React, { useState } from "react";
import PrimaryBtn from "../../../../../../../../components/buttons/PrimaryBtn";
import ContentComponent from "../../../../../../../../components/ContentComponent";
import ContactSupport from "../../../../../../../../components/ContactSupport";
import CosignerForm from "./CosignerForm";
import Modal from "../../../../../../../../components/Modal";
type Props = { cosigner: any };

export const CosignerStatus: React.FC<Props> = ({ cosigner }) => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);

  if (!cosigner?.status) return <CosignerForm />;
  switch (cosigner?.status) {
    case 1:
      return (
        <ContentComponent header="Your cosigner details have been received">
          <p>
            Kindly be patient as our team reviews the cosigner details you have
            submitted. Once the cosigner is approved, you will be able to
            continue with the funding application request.
          </p>
          <ContactSupport />
        </ContentComponent>
      );
    case 2:
    case 6:
      return (
        <ContentComponent header="Cosigner requested to submit extra details">
          {!cosigner?.credit_report || cosigner?.status === 6 ? (
            <p>
              We have communicated to your cosigner to furnish us with more
              personal information. Kindly reach out to them and remind them to
              check their email and submit the required information.
              <br />
              Once the information they submit is approved, you will be able to
              proceed with this funding application.
            </p>
          ) : (
            <p>
              Your cosigner has submitted their details. Please be patient as we
              process their details
              <br />
              Once the information they submitted is approved, you will be able
              to proceed with this funding application.
            </p>
          )}
          <ContactSupport />
        </ContentComponent>
      );
    case 3:
      return (
        <ContentComponent header="Cosigner not elligible">
          <p className="">
            Sorry, the cosigner you submitted was found not elligible to cosign
            for your loan because of the following:{" "}
          </p>
          <span className="px-2">
            <b>Reason : </b>
            {cosigner?.remark}
          </span>
          <p>
            Please click **Submit another cosigner** to submit another cosigner
            if you have one.
          </p>
          <p>
            If you don't have another cosigner submit a funding advisory
            request.
          </p>
          <div className="row justify-end gap-2">
            {/* <CalendlyFundingAdvisory classes="text-btn" /> */}
            <PrimaryBtn onClick={toggleModal}>
              Submit another cosigner
            </PrimaryBtn>
          </div>
          <Modal
            open={open}
            setOpen={toggleModal}
            title="Funding Advisory Request"
          >
            <div className="modal">
              <CosignerForm onClose={toggleModal} />
            </div>
          </Modal>
        </ContentComponent>
      );
    case 4:
      return (
        <ContentComponent header="Cosigner approved">
          <p>
            Your cosigner has been approved to cosign you a student loan.
            <br />
            Please submit your details below in order to proceed with the
            funding application process.
          </p>
        </ContentComponent>
      );
    case 5:
      return (
        <>
          <p className="py-2">Your cosigner has been rejected</p>
          <CosignerForm />
        </>
      );
  }
};
