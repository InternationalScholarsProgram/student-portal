import { useRef } from "react";
import { Navigate } from "react-router";
import { useFinancesStore } from "./layout/FinancesLayout";
import { ispLogo } from "../../assets/imageLinks";
import { contacts, printPDF } from "../../utils/utils";

const Receipt = () => {
  const { selectedTransaction } = useFinancesStore((state) => state);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handlePrint = async () => {
    if (!sectionRef.current) {
      console.error("Section ref is not assigned.");
      return;
    }
    printPDF(payment_intent_id, sectionRef.current);
    console.log(payment_intent_id);
    return;
  };

  if (!selectedTransaction) return <Navigate to="/account-statements" />;

  const { purpose, payment_intent_id, date_completed, amount, country } =
    selectedTransaction;

  return (
    <main ref={sectionRef} className="content-container">
      <div className="w-full m-[3%] p-[2%] col justify-between gap-10">
        {/* Header */}
        <div className="flex flex-row justify-between items-center">
          <div className="w-1/3 h-[13vh] col">
            <img src={ispLogo} alt="Logo" className="h-full object-contain" />
          </div>
          <div className="w-1/2 col gap-1">
            <p>
              Wells Fargo Center, 100 S. Ashley Drive, Suite 600, Tampa, FL,
              33602
            </p>
            <p>Florida, Tampa | +1 (813) 333 1080</p>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="mt-4 col gap-1">
          <div className="row gap-1 ">
            <p className="font-bold">Name:</p>
            <span>{selectedTransaction.names}</span>
          </div>
          <div className="row gap-1">
            <p className="font-bold">Email:</p>
            <span>{selectedTransaction.email}</span>
          </div>
          <div className="row gap-1">
            <p className="font-bold">Receipt Number: </p>
            <span>{payment_intent_id}</span>
          </div>
          <div className="row gap-1">
            <p className="font-bold">Generated On: </p>
            <span>{new Date().toDateString()}</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border mt-3 border-collapse border-gray-300">
            <thead>
              <tr className="bg-primary-main text-white">
                <th className="border px-4 py-2">Transaction Details</th>
                <th className="border px-4 py-2">Payment Ref</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">{purpose}</td>
                <td className="border px-4 py-2">{payment_intent_id}</td>
                <td className="border px-4 py-2">
                  {new Date(date_completed).toDateString()}
                </td>
                <td className="border px-4 py-2">${amount}</td>
              </tr>
              <tr>
                <td colSpan={2} className="border px-4 py-2"></td>
                <td className="border px-4 py-2 font-bold">Total</td>
                <td className="border px-4 py-2 font-bold">${amount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 text-center text-sm">
          <p>
            Disclaimer: Contact us at {contacts(country)} or email
            accounts@internationalscholarsprogram.com.
          </p>
          <p>***** COMPUTER GENERATED STATEMENT *****</p>
        </div>
        <div
          data-html2canvas-ignore
          className="w-full row justify-end items-end"
        >
          <button
            className="bg-primary-main text-white px-4 py-2 rounded shadow hover:bg-blue-800"
            onClick={handlePrint}
          >
            Print
          </button>
        </div>
      </div>
    </main>
  );
};

export default Receipt;
