import React, { useState } from "react";
import Modal from "../../../../../../../components/Modal";
import LetterHead from "../../../../../../../components/letters/LetterHead";
import Address from "../../../../../../../components/letters/Address";
import useFetchUser from "../../../../../../../services/hooks/useFetchUser";
import FormFooterBtns from "../../../../../../../components/buttons/FormFooterBtns";
import BobSignatory from "../../../../../../../components/letters/BobSignatory";
import PrimaryBtn from "../../../../../../../components/buttons/PrimaryBtn";
import useRelocation from "../../services/useRelocation";
import {
  fetchIp,
  formatCurrency,
  formatDate,
  generatePdf,
} from "../../../../../../../utils/utils";
import dayjs from "dayjs";
import SignContract from "../../../../../../../components/letters/SignContract";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import relocationApis from "../../services/relocationApis";
import { InlineLoader } from "../../../../../../../components/loaders/Loader";
import AxiosError from "../../../../../../../components/errors/AxiosError";
import { GridColDef } from "@mui/x-data-grid";
import SimpleTable from "../../../../../../../components/tables/SimpleTable";
import fundingEndpoints from "../../../../services/fundingEndpoints";

const RelocationContract = () => {
  const { user } = useFetchUser();
  const { relocationStatus, loan, invalidate } = useRelocation();

  const {
    data: schedulePayments,
    isLoading,
    error,
  } = useQuery({
    queryKey: [user?.email, "repayment-schedule"],
    queryFn: () => fundingEndpoints.repaymentSchedule(loan),
    select: (response) => response?.data?.data,
  });
  const { data: ipData } = useQuery({
    queryKey: ["ip"],
    queryFn: fetchIp,
  });

  const [isSigned, setIsSigned] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  const targetRef = React.useRef<HTMLDivElement>(null);
  const application = relocationStatus?.application;

  const pdf = async () => {
    if (!targetRef?.current) return;
    const doc = await generatePdf("OfferLetter", targetRef.current, true);
    return doc.doc;
  };

  const signContract = useMutation({
    mutationFn: async () => {
      setIsSigned(true);
      const doc = await pdf();
      return relocationApis.signContract({
        ip: ipData?.ip,
        city: ipData?.city,
        country_name: ipData?.country_name,
        loan_id: loan?.loan_id,
        stu_name: loan?.fullnames,
        file: doc,
      });
    },
    onSuccess: () => {
      toast.success("Contract signed successfully.");
      invalidate("status");
    },
  });

  if (isLoading) return <InlineLoader />;
  if (error || !schedulePayments?.length) return <AxiosError error={error} />;
  return (
    <>
      <PrimaryBtn onClick={toggleModal} className="self-end">
        Sign Contract
      </PrimaryBtn>
      <Modal title="Loan Contract" open={open} setOpen={toggleModal}>
        <div className="w-[95vw] md:w-[80vw] xl:w-[70vw] h-[80vh] p-2 overflow-y-auto">
          <div ref={targetRef} className="col w-full">
            <LetterHead />
            <Address email=" " />
            <article className="py-3 col gap-2">
              <b className="underline uppercase">
                RE: Relocation Loan Contract
              </b>
              <section className="col gap-3">
                <b>
                  This relocation loan agreement (this "agreement") dated{" "}
                  {formatDate(new Date())}.
                </b>
                <span>BETWEEN</span>
                <p>
                  <b>The International Scholars Program</b> of 100 S Ashley
                  Drive, Suite 600, Tampa, FL, 33602("the lender") and
                  <b> {loan?.fullnames}</b> of {application?.usa_address} ("the
                  borrower").
                </p>
                <p>
                  <b>IN CONSIDERATION OF </b>the lender loaning certain monies
                  (the "loan") to the borrower and the borrower repaying the
                  loan to the lender, the parties agree to keep, perform, and
                  fulfill the promises and conditions set out in this agreement.
                </p>
                <div className="col gap-3 p-3">
                  <div className="col gap-2">
                    <h5>LOAN AMOUNT & INTEREST</h5>
                    <p>
                      1. The lender promises to loan{" "}
                      <b> USD {loan?.principal}</b> to the borrower to cover for
                      school fees and the borrower promises to repay this
                      principal amount to the lender, paying on the unpaid
                      principal amount at the rate of <b>12%</b> per annum,
                      beginning on {formatDate(loan?.maturity_date)}.
                    </p>
                  </div>

                  <h5>PAYMENT</h5>
                  <p>
                    2. This loan will be repaid in consecutive monthly
                    installments of principal and interest commencing on{" "}
                    <b> {formatDate(loan?.maturity_date)}.</b> and continuing by
                    the 5th day of each following month until{" "}
                    <b>
                      {dayjs(loan?.maturity_date)
                        .add(5, "month")
                        .format("MMM DD, YYYY")}
                    </b>{" "}
                    with the balance then owing on this agreement being paid at
                    that time. 3. At any time not in default under this
                    agreement, the borrower may make lumpsum payments or pay the
                    outstanding balance then owing under this agreement to the
                    lender without further bonus or penalty.
                  </p>
                  <h5>DEFAULT</h5>
                  <p>
                    4. Notwithstanding anything to the contrary in this
                    agreement, if the borrower defaults in the performance of
                    any obligation under this agreement, then the lender may
                    declare the principal amount owing and the interest due
                    under this agreement at that time to be immediately due and
                    payable. 5. Further, if the lender declares the principal
                    amount owing under this agreement to be immediately due and
                    payable, and the borrower fails to provide full payment
                    within 5 business days, the borrower will be charged a{" "}
                    <b>30.00 USD</b> late fee.
                  </p>
                  <h5>GOVERNING LAW</h5>
                  <p>
                    6. This agreement will be construed in accordance with and
                    governed by the laws of the state of Florida.
                  </p>
                  <h5>COSTS</h5>
                  <p>
                    7. The borrower shall be liable for all costs, expenses and
                    expenditures incurred including, without limitation, the
                    complete legal cost of the lender incurred by enforcing this
                    agreement as a result of any default by the borrower and
                    such costs will be added to the principal then outstanding
                    and shall be due and payable by the borrower to the lender
                    immediately upon demand of the lender.
                  </p>
                  <h5>BINDING EFFECT</h5>
                  <p>
                    8. This agreement will pass to the benefit of and be binding
                    upon the respective heirs, executors, administrators,
                    successors and permitted assigns of the borrower and lender.
                    The borrower waives presentment for payment, notice of
                    non-payment, protest and notice of protest.
                  </p>
                  <h5>AMENDMENTS</h5>
                  <p>
                    9. This agreement may only be amended or modified by a
                    written instrument executed by both the borrower and the
                    lender.
                  </p>
                  <h5>SEVERABILITY</h5>
                  <p>
                    10. The clauses and paragraphs contained in this agreement
                    are intended to be read and construed independently of each
                    other. If any term, covenant, condition or provision of this
                    agreement is held by a court of competent jurisdiction to be
                    invalid, void or unenforceable, it is the parties’ intent
                    that such provision be reduced in scope by the court only to
                    the extent deemed necessary by that court to render the
                    provision reasonable and enforceable and the remainder of
                    the provisions of this agreement will in no way be affected,
                    impaired or invalidated as a result.
                  </p>
                  <h5>GENERAL PROVISIONS</h5>
                  <p>
                    11. Headings are inserted for the convenience of the parties
                    only and are not to be considered when interpreting this
                    agreement. Words in the singular mean and include the plural
                    and vice versa. Words in the masculine mean and include the
                    feminine and vice versa.
                  </p>
                  <h5>ENTIRE AGREEMENT</h5>
                  <p>
                    12. This agreement constitutes the entire agreement between
                    the parties and there are no further items or provisions,
                    either oral or otherwise.
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
                        <p>{application?.social_security_number || "N/A"}</p>
                      </div>
                      <div>
                        <p>Passport Number</p>
                        <p>{application?.passport_number}</p>
                      </div>
                      <div>
                        <p>Date of birth</p>
                        <p>{formatDate(application?.date_of_birth || "")}</p>
                      </div>
                      <div>
                        <p>University Attending</p>
                        <p>{loan?.fullnames}</p>
                      </div>
                      <div>
                        <p>Current US Address</p>
                        <p>{application?.usa_address}</p>
                      </div>
                    </table>
                  </div>
                  <div className="col gap-2">
                    <b>NEXT OF KIN DETAILS</b>
                    <table className="data-table">
                      <div>
                        <p>Full Name</p>
                        <p>{application?.next_of_kin_fullname}</p>
                      </div>
                      <div>
                        <p>Phone Number</p>
                        <p>{application?.next_of_kin_phone_number}</p>
                      </div>
                      <div>
                        <p>Address</p>
                        <p>{application?.next_of_kin_address}</p>
                      </div>
                    </table>
                  </div>
                  <div className="col gap-2">
                    <b>EMPLOYMENT DETAILS</b>
                    <table className="data-table">
                      {application?.employment_status.toString() === "1" ? (
                        <>
                          <div>
                            <p>Current Employer Name</p>
                            <p>{application?.employment_status}</p>
                          </div>
                          <div>
                            <p>Current Job Title</p>
                            <p>{application?.next_of_kin_phone_number}</p>
                          </div>
                          <div>
                            <p>Current Employer Address</p>
                            <p>{application?.next_of_kin_address}</p>
                          </div>
                        </>
                      ) : (
                        <div>
                          <p>Employment Status</p>
                          <p>N/A</p>
                        </div>
                      )}
                    </table>
                  </div>
                </div>
                <p className="title-sm">Loan details</p>
                <div className="col gap-1">
                  <p>
                    Approved Loan Amount -{" "}
                    <b>{formatCurrency(loan?.principal)}</b>
                  </p>
                  <p>
                    Origination Fee -{" "}
                    <b>{formatCurrency(loan?.origination_fee)}</b>
                  </p>
                  <p>
                    Loan Amount to be Disbursed (USD) -{" "}
                    <b>{formatCurrency(loan?.total_loan)}</b>
                  </p>
                  <p>
                    Loan repayment start date -{" "}
                    <b>{formatDate(loan.maturity_date)}</b>
                  </p>
                  <p>
                    Total Payable Amount -{" "}
                    <b>{formatCurrency(loan.total_payable)}</b>
                  </p>
                  <p>
                    Months - <b>{loan.term} months</b>
                  </p>
                </div>

                <div>
                  <p className="title-sm py-2">Repayment Schedule</p>
                  <SimpleTable columns={columns} rows={schedulePayments} />
                </div>
              </section>
              <section className="col gap-3">
                <p>
                  <b>IN WITNESS WHEREOF, </b>the parties have duly affixed their
                  signatures on <em>{formatDate(new Date())}.</em>
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
                            onSubmit={signContract.mutate}
                          />
                        </div>
                      ) : (
                        <div className="h-full w-1/3 border-dotted border-b-30" />
                      )}
                      <p className="col">
                        <b>{loan?.fullnames}</b>
                        <b>{relocationStatus?.application.usa_address}</b>
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </article>

            <p>FOR OFFICIAL USE ONLY</p>
            <p className="pb-3">{"  "}</p>
          </div>
          <FormFooterBtns
            onClose={toggleModal}
            onSubmit={signContract.mutate}
            btnText={signContract?.isPending ? "Signing..." : "Sign Contract"}
          />
        </div>
      </Modal>
    </>
  );
};

export default RelocationContract;
const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
    colSpan: (value, row) => {
      if (row.id === "transcripts") return 99;
      return undefined;
    },
  },
  {
    field: "maturity_date",
    headerName: "Maturity Date",
    flex: 1,
    valueGetter: (params) => formatDate(new Date(params), "MMM D, YYYY"),
  },
  // {
  //   field: "starting_balance",
  //   flex: 1,
  //   headerName: "Starting Balance",
  //   headerClassName: "p-0 m-0",
  // },
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
  // {
  //   field: "principal_payment",
  //   flex: 1,
  //   headerName: "Principal",
  // },
  {
    field: "new_balance",
    flex: 1,
    headerName: "New Balance",
  },
];
