import React from "react";
import PrimaryBtn from "../../../../../../../components/buttons/PrimaryBtn";
import { CalendlyFundingAdvisory } from "../../../../../../../components/Calendly";
import ContentComponent from "../../../../../../../components/ContentComponent";
import ContactSupport from "../../../../../../../components/ContactSupport";
import SallieApplicationForm from "./SallieApplicationForm";

export const CosignerStatus: React.FC<{ status: number }> = ({ status }) => {
  const renderStatus = () => {
    switch (status) {
      case 1:
        return (
          <ContentComponent header="Your cosigner details have been received">
            <p>
              Kindly be patient as our team reviews the cosigner details you
              have submitted. Once the cosigner is approved, you will be able to
              continue with the funding application request.
            </p>
            <ContactSupport />
          </ContentComponent>
        );

      case 2:
        return (
          <ContentComponent header="Cosigner requested to submit extra details">
            <p>
              We have communicated to your cosigner to furnish us with more
              personal information. Kindly reach out to them and remind them to
              check their email and submit the required information.
              <br />
              Once the information they submit is approved, you will be able to
              proceed with this funding application.
            </p>
            <ContactSupport />
          </ContentComponent>
        );
      case 3:
        return (
          <ContentComponent header="Cosigner not elligible">
            <p className="">
              Sorry, the cosigner you submitted was found not elligible to
              cosign for your loan because of the following: <br />
              <span className="text-dark">
                <strong>$cosigner['remark'];</strong>
              </span>
              <br />
              Please click **Submit another cosigner** to submit another
              cosigner if you have one.
              <br />
              If you don't have another cosigner submit a funding advisory
              request.
            </p>
            <div className="row justify-end gap-2">
              <CalendlyFundingAdvisory classes="text-btn" />
              <PrimaryBtn>Submit another cosigner</PrimaryBtn>
            </div>
          </ContentComponent>
        );
      case 4:
        return (
          <>
            <ContentComponent header="Cosigner approved">
              <p>
                Your cosigner has been approved to cosign you a student loan. Please
                submit your details below in order to proceed with the funding
                application process.
              </p>
            </ContentComponent>
            <div className="h-5" />
            <SallieApplicationForm />
          </>
        );
    }
  };
  return renderStatus();
};
