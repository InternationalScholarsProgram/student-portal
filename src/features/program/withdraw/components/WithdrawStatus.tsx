import PrimaryBtn from "../../../../components/buttons/PrimaryBtn";
import ContactSupport from "../../../../components/ContactSupport";
import ContentComponent from "../../../../components/ContentComponent";
import useFetchUser from "../../../../services/hooks/useFetchUser";

function WithdrawStatus({ toogleStatements, cancelRequest }: any) {
  const { user } = useFetchUser();

  if (user?.report === "active") {
    return (
      <div className="col gap-5">
        <p>You are about to make a withdrawal request...</p>
        <p>We will be sad to see you go!</p>
        <p>
          Before you withdraw from the program, please review your withdrawal
          statement below. Once you confirm everything looks good, please submit
          your withdrawal request, and wait for our team to respond. Please
          note, all withdrawals are processed on priority as received and it can
          take up to four(4) months for a refund (if any) to be made.
        </p>
        <p>Thank you for choosing our program. We wish you all the best.</p>
        <PrimaryBtn onClick={toogleStatements} className="w-1/3 self-end">
          Review
        </PrimaryBtn>
      </div>
    );
  }
  if (user?.report?.toLowerCase() === "disabled") {
    return (
      <ContentComponent header="Withdrawal Processed">
        <p>
          We have successfully processed your request to withdraw from the
          program
        </p>
        <p>
          We are sorry to see you go and wish you all the best in your future
          endeavors. If you have any questions or need further assistance,
          please feel free to contact us.
        </p>
        <p> Thank you for being a part of our community.</p>
        <ContactSupport />
        {/* <PrimaryBtn onClick={toogleStatements} className="w-1/3 self-end">
            Review
          </PrimaryBtn> */}
      </ContentComponent>
    );
  }
  if (user?.report === "requested") {
    switch (user?.withdrwal_status) {
      case "1":
        return (
          <div className="col gap-2">
            <p>Your withdrawal request has been received</p>
            <p>
              Kindly wait as the withdrawal request is being processed. Before
              this request is processed, you still have time to review your
              statement and cancel your withdrawal request if you wish so.
            </p>
            <PrimaryBtn
              onClick={() => cancelRequest.mutate()}
              className="w-1/3 self-end"
            >
              {cancelRequest.isPending ? "Canceling..." : "Cancel Request"}
            </PrimaryBtn>
          </div>
        );
      case "2":
        return (
          <div className="col gap-2">
            <p>Your withdrawal request has been received</p>
            <p>
              Kindly wait as the withdrawal request is being processed. Before
              this request is processed, you still have time to review your
              statement and cancel your withdrawal request if you wish so.
            </p>
            <PrimaryBtn
              onClick={() => cancelRequest.mutate()}
              className="w-1/3 self-end"
            >
              {cancelRequest.isPending ? "Canceling..." : "Cancel Request"}
            </PrimaryBtn>
          </div>
        );

      case "3":
        return (
          <div className="col gap-2">
            <p>Your withdrawal request has been processed</p>
            <p>
              Kindly review your statement and confirm the details. If you do
              not wish to proceed with this withdrawal, you can review the
              statement and decline, otherwise, you must review and confirm that
              the statement is correct for the withdrawal to be finalized.
            </p>
            <p>
              Please note, if there is a refund due to you, it will be processed
              within 4 months.
            </p>
            <PrimaryBtn onClick={toogleStatements} className="w-1/3 self-end">
              Review
            </PrimaryBtn>
          </div>
        );

      case "4":
        return (
          <div className="col gap-2">
            <p>Your withdrawal is being finalized</p>
            <p>
              Please be patient as we process your refund (if any). Once your
              withdrawal has been finalized, you will receive the final
              confirmation through your personal email. This process can take up
              to 4 months.
            </p>
          </div>
        );

      case "5":
        return (
          <div className="col gap-3">
            <p className="">
              This is to notify you that your request to withdraw from The
              International Scholars Program was rejected. Please note the
              reason below for rejection, then rectify and resubmit.
            </p>
            <div className="col gap-2 px-2">
              <p className="opacity-50 font-semibold">Admin Comments</p>
              <p className="px-3">{user?.reject_message}</p>
            </div>
            <PrimaryBtn
              onClick={() => cancelRequest.mutate()}
              className="self-end"
            >
              {cancelRequest.isPending ? "Loading..." : "Resubmit"}
            </PrimaryBtn>
          </div>
        );
      default:
        return null;
    }
  }
}

export default WithdrawStatus;
