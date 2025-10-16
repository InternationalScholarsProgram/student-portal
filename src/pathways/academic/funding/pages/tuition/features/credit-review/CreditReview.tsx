import { useCallback } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

import useTuition from "../../services/useTuition";
import tuitionEndpoints from "../../services/tuitionEndpoints";
import ContentComponent from "../../../../../../../components/ContentComponent";
import ContactSupport from "../../../../../../../components/ContactSupport";
import PrimaryBtn from "../../../../../../../components/buttons/PrimaryBtn";
import ProvideSchoolFeedback from "./ProvideSchoolFeedback";

function CreditReview() {
  const { creditReview, inValidateStatus } = useTuition();
  const resubmit = useMutation({
    mutationFn: tuitionEndpoints.requestCreditReiew,
    onSuccess: () => {
      toast.success("Credit review resubmitted successfully.");
      inValidateStatus();
    },
  });

  const statusMessages = useCallback(() => {
    switch (creditReview?.status) {
      case 1:
        return (
          <>
            <p>
              Your credit review is currently <strong>in progress</strong>.
            </p>
            <p>
              Our team is carefully evaluating your information to determine the
              most suitable funding options available to you
            </p>
            <ContactSupport />
          </>
        );

      case 2:
        // is approved, hence will render funding advisory
        return <p>Credit Approved</p>;
      case 3:
        return (
          <>
            <p>
              We regret to inform you that your credit review was{" "}
              <strong className="">not approved</strong>.
            </p>
            <p>
              Please review the reason provided below and make the necessary
              adjustments before resubmitting another review request,
            </p>
            <div className="py-">
              <p className="alert-error">
                <strong>Reason:</strong>{" "}
                {creditReview?.comment || "No specific remarks provided."}
              </p>
            </div>

            <PrimaryBtn onClick={() => resubmit.mutate()} className="self-end">
              {resubmit.isPending
                ? "Resubmitting..."
                : "Resubmit Credit Review"}
            </PrimaryBtn>
          </>
        );

      case 4:
        return (
          <>
            <p>
              Your credit review is currently undergoing a
              <strong> second evaluation.</strong>. We appreciate your continued
              patience as our team carefully re-assesses your application.
            </p>
            <ContactSupport />
          </>
        );

      default:
        return (
          <div className="">
            <p>Something went wrong. Please contact support for assistance.</p>
            <ContactSupport />
          </div>
        );
    }
  }, [creditReview?.status, resubmit.isPending]);

  if (!creditReview) return <ProvideSchoolFeedback />;
  return (
    <ContentComponent className="col" header="Credit Review">
      {statusMessages()}
    </ContentComponent>
  );
}

export default CreditReview;
