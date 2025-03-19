import { useMutation } from "@tanstack/react-query";
import PrimaryBtn from "../../../../../../components/buttons/PrimaryBtn";
import ContactSupport from "../../../../../../components/ContactSupport";

type Props = {
  stage: number;
  remarks: string;
};

const StatusMessages: React.FC<Props> = ({ stage, remarks }) => {
  const resubmit = useMutation({});
  switch (stage) {
    case 1:
      return (
        <>
          <p>
            Your credit review is currently <strong>in progress</strong>. Our
            team is carefully assessing your information to ensure the best
            funding options for you.
          </p>
          <p>
            This process may take some time, but rest assured, we’ll update you
            as soon as a decision is made.
          </p>
          <ContactSupport />
        </>
      );

    case 2:
      // is approved, hence will render funding advisory
      break;
    case 3:
      return (
        <>
          <p>
            Unfortunately, your credit review was{" "}
            <strong className="">not approved</strong> at this time.
          </p>
          <p>
            Please review the reason below and make the necessary adjustments
            before resubmitting.
          </p>
          <div className="py-">
            <p className="alert-error">
              <strong>Reason:</strong>{" "}
              {remarks || "No specific remarks provided."}
            </p>
          </div>
          <PrimaryBtn onClick={() => resubmit.mutate()} className="self-end">
            {resubmit.isPending
              ? "Processing..."
              : " 🔄 Resubmit Credit Review"}
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
};

export default StatusMessages;
