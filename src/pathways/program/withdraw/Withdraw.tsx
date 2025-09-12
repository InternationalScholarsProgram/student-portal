import { useEffect, useState } from "react";
import WithdrawStatus from "./components/WithdrawStatus";
import AccountStatements from "../../../pathways/finances/AccountStatements";
import PrimaryBtn from "../../../components/buttons/PrimaryBtn";
import useFetchUser from "../../../services/hooks/useFetchUser";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import PrimaryBorderBtn from "../../../components/buttons/PrimaryBorderBtn";
import useAccountStatement from "../../../services/hooks/useAccountStatement";
import WithdrawModalContent from "./components/WithdrawModalContent";
import Modal from "../../../components/Modal";
import {
  cancelWithdrawalAPI,
  confirmWithdrawalApi,
  getStatus,
  requestWithdrawalAPI,
} from "./utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FullLoader } from "../../../components/loaders/Loader";
import { formatCurrency } from "../../../utils/utils";

function Withdraw() {
  const { user, isLoading, userQueryKey } = useFetchUser();
  const { accountStatements } = useAccountStatement();
  const [viewStatements, setViewStatements] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const toogleStatements = () => setViewStatements(!viewStatements);
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: userQueryKey });

  const date_enrolled = dayjs(user?.Date_enlored).format("MMMM D, YYYY");
  const monthsEnrolled = dayjs(new Date()).diff(
    dayjs(user?.Date_enlored),
    "month"
  );
  const refund = () => {
    if (accountStatements?.balance >= 0) {
      if (monthsEnrolled > 6) {
        return "Amount to be refunded $" + accountStatements?.balance;
      } else {
        return "Amount to be refunded $ 0.00 (Enrolled for less than 6 months)";
      }
    } else {
      return (
        "You owe us " +
        formatCurrency(Math.abs(accountStatements?.balance), "USD", 2)
      );
    }
  };
  useEffect(() => {
    if (monthsEnrolled > 7 && user?.report === "active") {
      // setViewStatements(true);
      Swal.fire({
        title: "Important Notice",
        html: `
          <p>Dear ${user?.fullnames},</p>
          <p>We wanted to let you know that since you enrolled on <strong>${date_enrolled}</strong>, it has only been <strong>${monthsEnrolled} months</strong>. Unfortunately, due to this timeframe, you are <strong>not eligible for a refund</strong>.</p>
        `,
        icon: "warning",
        confirmButtonText: "Continue",
        customClass: {
          popup: "swal-wide",
        },
        allowOutsideClick: false, // Prevent dismissing by clicking outside
      });
    }
  }, [isLoading]);

  const onSuccess = (message?: string) => {
    setViewStatements(false);
    invalidate();
    toast.success(message || "Success!");
  };

  const createRequest = useMutation({
    mutationFn: requestWithdrawalAPI,
    onSuccess: () => onSuccess("Withdrawal Request Sent!"),
  });
  const confirmWithdrawal = useMutation({
    mutationFn: confirmWithdrawalApi,
    onSuccess: () => onSuccess("Withdrawal Confirmed!"),
  });
  const cancelRequest = useMutation({
    mutationFn: cancelWithdrawalAPI,
    onSuccess: () => onSuccess("Withdrawal Cancelled!"),
  });

  if (isLoading && !user) return <FullLoader />;

  return (
    <>
      {/* {user?.report + " " + user?.withdrwal_status} */}
      <main className="">
        {user?.withdrwal_status !== "6" && (
          <div className="row items-center gap-1 pb-3 w-full border-b opacity-70">
            <p className="">Current Withdrawal Status: </p>
            <span className="font-semibold capitalize">
              {getStatus(user ? user?.withdrwal_status : "")}
            </span>
          </div>
        )}
        <section className="col">
          {viewStatements ? (
            <div className="col-center gap-4">
              <AccountStatements hideBalance={true} />
              <div className="w-full">{refund()}</div>

              <div className="w-full flex flex-col-reverse justify-end items-center sm:flex-row gap-4 px-2">
                {viewStatements && user?.report === "requested" && (
                  <div className="flex-1">
                    <p
                      className="text-primary-main cursor-pointer"
                      onClick={toogleStatements}
                    >
                      Go Back
                    </p>
                  </div>
                )}
                {user?.report === "requested" ? (
                  <PrimaryBorderBtn onClick={() => cancelRequest.mutate()}>
                    {cancelRequest.isPending
                      ? "Canceling..."
                      : "Cancel Request"}
                  </PrimaryBorderBtn>
                ) : (
                  <PrimaryBorderBtn onClick={toogleStatements}>
                    Go Back
                  </PrimaryBorderBtn>
                )}
                {user?.report === "active" ? (
                  <PrimaryBtn onClick={() => createRequest.mutate()}>
                    Request Withdrawal
                  </PrimaryBtn>
                ) : (
                  <PrimaryBtn onClick={() => confirmWithdrawal.mutate()}>
                    Accept & Request Withdrawal
                  </PrimaryBtn>
                )}
              </div>
            </div>
          ) : (
            <WithdrawStatus
              toogleStatements={toogleStatements}
              cancelRequest={cancelRequest}
            />
          )}
        </section>
        <Modal title="Account Details" open={openModal} setOpen={setOpenModal}>
          <WithdrawModalContent />
        </Modal>
      </main>
    </>
  );
}

export default Withdraw;
