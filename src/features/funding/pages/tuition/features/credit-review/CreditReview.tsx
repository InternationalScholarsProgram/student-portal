import { useCallback } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

import useTuition from "../../services/useTuition";
import tuitionEndpoints from "../../services/tuitionEndpoints";
import ContentComponent from "../../../../../../components/ContentComponent";
import ContactSupport from "../../../../../../components/ContactSupport";
import PrimaryBtn from "../../../../../../components/buttons/PrimaryBtn";
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
              Your credit review is currently <strong>in progress</strong>. Our
              team is carefully assessing your information to ensure the best
              funding options for you.
            </p>
            <p>
              This process may take some time, but rest assured, we’ll update
              you as soon as a decision is made.
            </p>
            <ContactSupport />
          </>
        );

      case 2:
        // is approved, hence will render funding advisory
        return (
          <p>Credit Approved</p>
        );
      case 3:
        return (
          <>
            <p>
              Unfortunately, your credit review was{" "}
              <strong className="">not approved</strong>.
            </p>
            <p>
              Please review the reason below and make the necessary adjustments
              before resubmitting.
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
              Your credit review is currently{" "}
              <strong>under review for the second time</strong>. We appreciate
              your patience as our team carefully re-evaluates your application.
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
