import { Link } from "react-router-dom";
import Guides from "./Guides";
import useFetchUser from "../../../services/hooks/useFetchUser";
import { BASE_URL } from "../../../services/api/base";

const EligibilityStatusCheck = ({ eligibility }: any) => {
  if (eligibility?.code === 409)
    return <UpgradeVersion message={eligibility.message} />;
  if (eligibility?.code === 402)
    return <CompletePayment balance={eligibility?.message?.deficit} />;
  if (eligibility?.code === 400) return <NotFound />;
};

export default EligibilityStatusCheck;

function CompletePayment({ balance }: { balance: string }) {
  return (
    <main>
      <div className="card col p-3">
        {/* <h3>Insufficient Funds</h3> */}
        <p>
          To proceed to the school application stage, please ensure that your
          program contributions are fully paid!
        </p>
        <p>
          Your outstanding balance is <strong>{balance}</strong>.
        </p>
        <p>
          Kindly complete the payment to move to the school application stage.
        </p>
        <Link
          to="/finances/make-payments"
          state="test"
          className="self-end my-2 primary-btn"
        >
          Make Payment
        </Link>
      </div>
    </main>
  );
}

function UpgradeVersion({ message }: { message: any }) {
  const { user } = useFetchUser();
  const contractUrl = `${BASE_URL}/login/member/dashboard/contract_shift.php?`;
  const params = `id=${user?.sign_contract}&action=notsigned`;
  const url = contractUrl + params;
  return (
    <main className="">
      <p className="text-primary-light text-xl font-semibold mb-4">
        Upgrade to Continue
      </p>
      <section className="col card gap-4 p-4">
        <p className="">
          You are currently using version{" "}
          <strong className="text-primary-light">{message.version}</strong> of
          the program, which is now outdated.
        </p>
        <p className="">
          A newer version,{" "}
          <strong className="text-secondary-main">Version 3</strong>, is
          available. Upgrading ensures you can continue using the latest
          features and benefits of the program.
        </p>
        <p className="">
          Before proceeding, please carefully review the new{" "}
          <strong>Terms and Conditions</strong>. By signing the contract for the
          new version, you agree to these terms.
        </p>
        <p className="text-lg font-medium ">To upgrade:</p>
        <ul className="list-disc list-inside ">
          <li>Review the new Terms and Conditions.</li>
          <li>Sign the contract for Version 3.</li>
        </ul>
        <p className="">
          If you have any questions or need assistance, please contact support
          by creating a ticket.
        </p>
        <div className="row-center flex-wrap">
          <Link
            target="_blank"
            to={url}
            className="text-primary-light underline mb-2"
          >
            Read Terms and Conditions
          </Link>
          <div className="flex-1 row justify-end gap-3">
            <Link to="/tickets/create-ticket" className="text-btn">
              Contact Support
            </Link>
            <Link to={url} target="_blank" className="primary-btn">
              Sign New Contract
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function NotFound() {
  return (
    <main>
      <Guides />
      <section className="col gap-2 w-full mt-4">
        <p className="text-error-main text-xl">Cannot proceed</p>
        <div className="col card p-3">
          <p className="py-3">You are not eligible for admission</p>
          <p>Please create a ticket to contact support</p>
          <Link
            to="/tickets/create-ticket"
            className="self-end my-2 primary-btn"
          >
            Create Ticket
          </Link>
        </div>
      </section>
    </main>
  );
}
