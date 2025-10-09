// PersonalContract.tsx
import React, { useState } from "react";
import Modal from "../../../../../../../components/Modal";
import LetterHead from "../../../../../../../components/letters/LetterHead";
import Address from "../../../../../../../components/letters/Address";
import useFetchUser from "../../../../../../../services/hooks/useFetchUser";
import BobSignatory from "../../../../../../../components/letters/BobSignatory";
import PrimaryBtn from "../../../../../../../components/buttons/PrimaryBtn";
import usePersonal from "../../services/usePersonal";
import {
  fetchIp,
  formatCurrency,
  formatDate,
  generatePdf,
} from "../../../../../../../utils/utils";
import dayjs from "dayjs";
import SignContract from "../../../../../../../components/letters/SignContract";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { InlineLoader } from "../../../../../../../components/loaders/Loader";
import AxiosError from "../../../../../../../components/errors/AxiosError";
import { GridColDef } from "@mui/x-data-grid";
import SimpleTable from "../../../../../../../components/tables/SimpleTable";
import personalEndpoints from "../../services/personalEndpoints";



/** Narrow generatePdf result */
type GenPdfOk = { blob?: Blob; doc?: unknown; instance?: unknown; name?: string };
function hasDoc(v: unknown): v is GenPdfOk & { doc: unknown } {
  return !!v && typeof v === "object" && "doc" in (v as any);
}

/** Safely clone ANY ArrayBufferLike into a real ArrayBuffer (handles SharedArrayBuffer) */
function toPlainArrayBuffer(bufLike: ArrayBufferLike): ArrayBuffer {
  const view = new Uint8Array(bufLike as ArrayBufferLike);
  const out = new ArrayBuffer(view.byteLength);
  new Uint8Array(out).set(view);
  return out;
}

const PersonalContract = () => {
  const { user } = useFetchUser();
  const { user_details: application, personalLoan: loan, invalidate } = usePersonal();

  // Repayment schedule — follow the same structure as Relocation for now.
  // When you have a personal endpoint, replace `relocationApis.repaymentSchedule(loan)`.
  const {
    data: schedulePayments,
    isLoading,
    error,
  } = useQuery({
    queryKey: [user?.email, "repayment-schedule", loan?.loan_id],
    queryFn: () => personalEndpoints.repaymentSchedule(loan), // TODO: swap to personal repayment API
    select: (response) => {
      const payload = response?.data?.data ?? {};
      const schedule = Array.isArray(payload?.schedule) ? payload.schedule : [];
      return schedule
        .filter((row: any) => Number(row?.scheduled_payment ?? 0) > 0)
        .map((row: any, idx: number) => ({
          id: idx + 1,
          maturity_date: row?.maturity_date,
          scheduled_payment: Number(row?.scheduled_payment ?? 0),
          interest_rate: Number(row?.interest_rate ?? 0),
          new_balance: Number(row?.new_balance ?? 0),
          status: (row?.status as string) || "Pending",
        }));
    },
    enabled: !!loan?.loan_id,
  });

  const { data: ipData } = useQuery({
    queryKey: ["ip"],
    queryFn: fetchIp,
  });

  const [isSigned, setIsSigned] = useState(false);

  // Main PDF modal
  const [openContract, setOpenContract] = useState(false);
  const toggleContractModal = () => setOpenContract((v) => !v);

  // Reject reason inside the PDF DOM
  const [rejectMode, setRejectMode] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  // Action loaders
  const [isSigning, setIsSigning] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const targetRef = React.useRef<HTMLDivElement>(null);

  // Normalize generatePdf outputs into a File safely (handles SharedArrayBuffer)
  const makePdfFile = async (): Promise<File> => {
    if (!targetRef?.current) throw new Error("Unable to generate contract PDF.");
    const result = await generatePdf("OfferLetter", targetRef.current, true);

    if (!hasDoc(result)) {
      throw new Error((result as any)?.message || "Failed to generate PDF for contract.");
    }

    const name = `${loan?.loan_id}_${loan?.fullnames}_contract.pdf`;
    const type = "application/pdf";
    const doc: unknown = result.doc;

    // 1) File
    if (typeof File !== "undefined" && doc instanceof File) {
      return doc;
    }

    // 2) Blob
    if (typeof Blob !== "undefined" && doc instanceof Blob) {
      return new File([doc], name, { type });
    }

    // 3) Data URL string -> ArrayBuffer -> Blob -> File
    if (typeof doc === "string" && doc.startsWith("data:application/pdf")) {
      const base64 = doc.split(",")[1];
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const arr = toPlainArrayBuffer(bytes.buffer); // ensure plain ArrayBuffer
      const blob = new Blob([arr], { type });
      return new File([blob], name, { type });
    }

    // 4) ArrayBuffer or SharedArrayBuffer
    if (
      typeof doc === "object" &&
      doc !== null &&
      typeof (doc as any).byteLength === "number" &&
      // ensure it's not a view (no byteOffset)
      typeof (doc as any).byteOffset !== "number"
    ) {
      const arr = toPlainArrayBuffer(doc as ArrayBufferLike);
      const blob = new Blob([arr], { type });
      return new File([blob], name, { type });
    }

    // 5) ArrayBufferView (e.g., Uint8Array)
    if (
      doc &&
      typeof (doc as any).buffer === "object" &&
      typeof (doc as any).byteOffset === "number" &&
      typeof (doc as any).byteLength === "number"
    ) {
      const view = doc as ArrayBufferView;
      // Create a clean ArrayBuffer copy (works even if underlying buffer is SharedArrayBuffer)
      const copied = toPlainArrayBuffer(
        view.buffer.slice
          ? (view.buffer.slice(view.byteOffset, view.byteOffset + view.byteLength) as ArrayBufferLike)
          : (view.buffer as ArrayBufferLike)
      );
      const blob = new Blob([copied], { type });
      return new File([blob], name, { type });
    }

    throw new Error("Unsupported PDF output from generatePdf().");
  };

  /** SIGN (ACCEPT) */
  const handleSign = async () => {
    try {
      setIsSigning(true);
      setIsSigned(true);
      const file = await makePdfFile();

      const payload = {
        action: "accept",
        student_id: user?.email || "",
        ip: ipData?.ip,
        city: ipData?.city,
        country_name: ipData?.country_name,
        loan_id: loan?.loan_id,
        stu_name: loan?.fullnames,
        file,
      };

      // TODO: swap to personal API
      await personalEndpoints.signContract(payload);
      toast.success("Contract signed successfully.");
      invalidate("status");
      setOpenContract(false);
    } catch (err: any) {
      setIsSigned(false);
      toast.error(err?.message || "Contract sign failed.");
    } finally {
      setIsSigning(false);
    }
  };

  /** REJECT */
  const handleReject = async () => {
    try {
      if (!rejectReason.trim()) {
        toast.error("Please provide a reason to reject the contract.");
        return;
      }
      setIsRejecting(true);

      const payload = {
        action: "reject",
        student_id: user?.email || "",
        reason: rejectReason.trim(),
        ip: ipData?.ip,
        city: ipData?.city,
        country_name: ipData?.country_name,
        loan_id: loan?.loan_id,
      };

      // TODO: swap to personal API
      await personalEndpoints.signContract(payload);
      toast.success("Contract rejected successfully.");
      invalidate("status");
      setOpenContract(false);
      setRejectMode(false);
      setRejectReason("");
    } catch (err: any) {
      toast.error(err?.message || "Failed to reject contract.");
    } finally {
      setIsRejecting(false);
    }
  };

  if (isLoading) return <InlineLoader />;
  if (error || !schedulePayments?.length) return <AxiosError error={error} />;

  return (
    <>
      <PrimaryBtn onClick={toggleContractModal} className="self-end">
        Open Contract
      </PrimaryBtn>

      <Modal title="Loan Contract" open={openContract} setOpen={toggleContractModal}>
        <div className="relative w-[95vw] md:w-[80vw] xl:w-[70vw] h-[80vh] p-2 overflow-y-auto">
          <div ref={targetRef} className="col w-full">
            <LetterHead />
            <Address email=" " />
            <article className="py-3 col gap-2">
              <b className="underline uppercase">RE: Personal Loan Contract</b>
              <section className="col gap-3">
                <b>
                  This personal loan agreement (this "agreement") dated {formatDate(new Date())}.
                </b>
                <span>BETWEEN</span>
                <p>
                  <b>The International Scholars Program</b> of 100 S Ashley Drive, Suite 600, Tampa, FL, 33602 ("the
                  lender") and <b> {loan?.fullnames}</b> of {application?.permanent_us_address} ("the borrower").
                </p>
                <p>
                  <b>IN CONSIDERATION OF </b>the lender loaning certain monies (the "loan") to the borrower and the
                  borrower repaying the loan to the lender, the parties agree to keep, perform, and fulfill the promises
                  and conditions set out in this agreement.
                </p>
                <div className="col gap-3 p-3">
                  <div className="col gap-2">
                    <h5>LOAN AMOUNT & INTEREST</h5>
                    <p>
                      1. The lender promises to loan <b>{formatCurrency(loan?.principal)}</b> to the borrower to cover
                      personal needs and the borrower promises to repay this principal amount to the lender, paying on
                      the unpaid principal amount at the rate of <b>12%</b> per annum, beginning on{" "}
                      {formatDate(loan?.maturity_date)}.
                    </p>
                  </div>

                  <h5>PAYMENT</h5>
                  <p>
                    2. This loan will be repaid in consecutive monthly installments of principal and interest commencing
                    on <b> {formatDate(loan?.maturity_date)}.</b> and continuing by the 5th day of each following month
                    until <b>{dayjs(loan?.maturity_date).add(5, "month").format("MMM DD, YYYY")}</b> with the balance
                    then owing on this agreement being paid at that time. 3. At any time not in default under this
                    agreement, the borrower may make lumpsum payments or pay the outstanding balance then owing under
                    this agreement to the lender without further bonus or penalty.
                  </p>
                  <h5>DEFAULT</h5>
                  <p>
                    4. Notwithstanding anything to the contrary in this agreement, if the borrower defaults in the
                    performance of any obligation under this agreement, then the lender may declare the principal amount
                    owing and the interest due under this agreement at that time to be immediately due and payable. 5.
                    Further, if the lender declares the principal amount owing under this agreement to be immediately due
                    and payable, and the borrower fails to provide full payment within 5 business days, the borrower will
                    be charged a <b>30.00 USD</b> late fee.
                  </p>
                  <h5>GOVERNING LAW</h5>
                  <p>6. This agreement will be construed in accordance with and governed by the laws of the state of Florida.</p>
                  <h5>COSTS</h5>
                  <p>
                    7. The borrower shall be liable for all costs, expenses and expenditures incurred including, without
                    limitation, the complete legal cost of the lender incurred by enforcing this agreement as a result of
                    any default by the borrower and such costs will be added to the principal then outstanding and shall
                    be due and payable by the borrower to the lender immediately upon demand of the lender.
                  </p>
                  <h5>BINDING EFFECT</h5>
                  <p>
                    8. This agreement will pass to the benefit of and be binding upon the respective heirs, executors,
                    administrators, successors and permitted assigns of the borrower and lender. The borrower waives
                    presentment for payment, notice of non-payment, protest and notice of protest.
                  </p>
                  <h5>AMENDMENTS</h5>
                  <p>9. This agreement may only be amended or modified by a written instrument executed by both the borrower and the lender.</p>
                  <h5>SEVERABILITY</h5>
                  <p>
                    10. The clauses and paragraphs contained in this agreement are intended to be read and construed
                    independently of each other. If any term, covenant, condition or provision of this agreement is held
                    by a court of competent jurisdiction to be invalid, void or unenforceable, it is the parties’ intent
                    that such provision be reduced in scope by the court only to the extent deemed necessary by that
                    court to render the provision reasonable and enforceable and the remainder of the provisions of this
                    agreement will in no way be affected, impaired or invalidated as a result.
                  </p>
                  <h5>GENERAL PROVISIONS</h5>
                  <p>
                    11. Headings are inserted for the convenience of the parties only and are not to be considered when
                    interpreting this agreement. Words in the singular mean and include the plural and vice versa. Words
                    in the masculine mean and include the feminine and vice versa.
                  </p>
                  <h5>ENTIRE AGREEMENT</h5>
                  <p>
                    12. This agreement constitutes the entire agreement between the parties and there are no further
                    items or provisions, either oral or otherwise.
                  </p>
                </div>
              </section>

              <section className="col gap-3">
                <div className="col gap-2">
                  <div className="col gap-2">
                    <b>PERSONAL DETAILS</b>
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
                        <p>{application?.passport_number || "N/A"}</p>
                      </div>
                      <div>
                        <p>Date of birth</p>
                        <p>{formatDate(application?.dob || "")}</p>
                      </div>
                      <div>
                        <p>Current US Address</p>
                        <p>{application?.permanent_us_address}</p>
                      </div>
                    </table>
                  </div>

                  <div className="col gap-2">
                    <b>NEXT OF KIN DETAILS</b>
                    <table className="data-table">
                      <div>
                        <p>Full Name</p>
                        <p>
                          {[
                            application?.next_of_kin_fname || "",
                            application?.next_of_kin_mname || "",
                            application?.next_of_kin_lname || "",
                          ]
                            .filter(Boolean)
                            .join(" ")
                            .replace(/\s+/g, " ")
                            .trim() || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p>Phone Number</p>
                        <p>{application?.next_of_kin_phone_number || "N/A"}</p>
                      </div>
                      <div>
                        <p>Address</p>
                        <p>{application?.next_of_kin_permanent_address || "N/A"}</p>
                      </div>
                    </table>
                  </div>
                </div>

                <p className="title-sm">Loan details</p>
                <div className="col gap-1">
                  <p>
                    Approved Loan Amount - <b>{formatCurrency(loan?.principal)}</b>
                  </p>
                  <p>
                    Origination Fee - <b>{formatCurrency(loan?.origination_fee)}</b>
                  </p>
                  <p>
                    Loan Amount to be Disbursed (USD) - <b>{formatCurrency(loan?.total_loan)}</b>
                  </p>
                  <p>
                    Loan repayment start date - <b>{formatDate(loan?.maturity_date)}</b>
                  </p>
                  <p>
                    Total Payable Amount - <b>{formatCurrency(loan?.total_payable)}</b>
                  </p>
                  <p>
                    Months - <b>{loan?.term} months</b>
                  </p>
                </div>

                <div>
                  <p className="title-sm py-2">Repayment Schedule</p>
                  <SimpleTable columns={columns} rows={schedulePayments} />
                </div>
              </section>

              {/* Reject block INSIDE PDF when rejecting */}
              {rejectMode && (
                <section className="col gap-2 border rounded-md p-3 bg-red-50">
                  <b className="text-red-600">Contract Decision Reason (Required for Rejection)</b>
                  <p className="text-sm text-slate-700">
                    Please provide the reason for rejecting this contract. This note will be attached to your contract record.
                  </p>
                  <textarea
                    className="w-full min-h-[120px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-200 bg-white"
                    placeholder="Enter reason..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  />
                </section>
              )}

              <section className="col gap-3">
                <p>
                  <b>IN WITNESS WHEREOF, </b>the parties have duly affixed their signatures on{" "}
                  <em>{formatDate(new Date())}.</em>
                </p>
                <div className="col ">
                  <p>
                    SIGNED AND DELIVERED this
                    <em className="px-2">{formatDate(new Date())}</em>
                    for The International Scholars Program.
                  </p>
                  <BobSignatory />
                </div>
                <div className="col">
                  <p>
                    SIGNED AND DELIVERED this
                    <em className="px-2">{formatDate(new Date())}</em>
                  </p>
                  <div className="my-3 col gap-5 min-h-[10vh]">
                    <div className="my-3 col justify-end min-h-[15vh]">
                      {isSigned ? (
                        <div className="p-2">
                          <SignContract
                            show={false}
                            name={loan?.fullnames || ""}
                            isSigned={isSigned}
                            onSubmit={handleSign}
                          />
                        </div>
                      ) : (
                        <div className="h-full w-1/3 border-dotted border-b-30" />
                      )}
                      <p className="col">
                        <b>{loan?.fullnames}</b>
                        <b>{application?.permanent_us_address}</b>
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </article>

            <p>FOR OFFICIAL USE ONLY</p>
            <p className="pb-3">{"  "}</p>
          </div>

          {/* Footer actions INSIDE the modal */}
          <div className="mt-3 flex items-center justify-between">
            <button
              onClick={toggleContractModal}
              className="px-4 py-2 rounded-md border bg-white hover:bg-slate-50"
              disabled={isSigning || isRejecting}
            >
              Close
            </button>

            <div className="flex items-center gap-2">
              {!rejectMode ? (
                <button
                  onClick={() => setRejectMode(true)}
                  className="px-4 py-2 rounded-md border border-red-300 bg-red-50 text-red-600 hover:bg-red-100 transition disabled:opacity-60"
                  disabled={isSigning || isRejecting}
                >
                  Reject
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setRejectMode(false)}
                    className="px-4 py-2 rounded-md border bg-white hover:bg-slate-50 disabled:opacity-60"
                    disabled={isSigning || isRejecting}
                  >
                    Cancel Reject
                  </button>
                  <button
                    onClick={handleReject}
                    disabled={isRejecting || !rejectReason.trim()}
                    className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 inline-flex items-center gap-2"
                    aria-busy={isRejecting}
                  >
                    {isRejecting && <span className="loader-dot" />}
                    {isRejecting ? "Submitting rejection..." : "Submit Rejection"}
                  </button>
                </>
              )}

              <button
                onClick={handleSign}
                className="px-4 py-2 rounded-md bg-primary-main text-white hover:brightness-110 disabled:opacity-60 inline-flex items-center gap-2"
                disabled={isSigning || isRejecting}
                aria-busy={isSigning}
              >
                {isSigning && <span className="loader-dot" />}
                {isSigning ? "Signing..." : "Sign Contract"}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Tiny CSS loader for buttons */}
      <style>{`
        .loader-dot {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: currentColor;
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
};

export default PersonalContract;

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
    colSpan: (value, row) => {
      if ((row as any).id === "transcripts") return 99;
      return undefined;
    },
  },
  {
    field: "maturity_date",
    headerName: "Maturity Date",
    flex: 1,
    valueGetter: (params) => formatDate(new Date(params), "MMM D, YYYY"),
  },
  {
    field: "scheduled_payment",
    flex: 1,
    headerName: "To Pay",
  },
  {
    field: "interest_rate",
    flex: 1,
    headerName: "Interest",
  },
  {
    field: "new_balance",
    flex: 1,
    headerName: "New Balance",
  },
];
