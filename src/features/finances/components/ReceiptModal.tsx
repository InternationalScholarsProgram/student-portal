import { useRef } from "react";
import { ispLogo } from "../../../assets/imageLinks";
import { contacts, generatePdf } from "../../../utils/utils";
import useFinancesStore from "./useFinancesStore";
import Modal from "../../../components/Modal";
import FormFooterBtns from "../../../components/buttons/FormFooterBtns";

const ReceiptModal = () => {
  const { selectedTransaction, openModal, toggleModal } = useFinancesStore();
  const sectionRef = useRef<HTMLDivElement>(null);

  const handlePrint = async () => {
    if (!sectionRef.current)
      return console.error("Section ref is not assigned.");

    generatePdf(payment_intent_id, sectionRef.current);
  };

  if (!selectedTransaction?.payment_intent_id) return null;

  const { purpose, payment_intent_id, date_completed, amount, country } =
    selectedTransaction;

  return (
    <Modal
      open={openModal}
      setOpen={toggleModal}
      title={`Receipt (${payment_intent_id})`}
    >
      <div className="modal col gap-3">
        <div ref={sectionRef} className="col gap-3">
          <div className="row justify-between items-center">
            <div className="h-[13vh] col">
              <img
                src={ispLogo}
                alt="Logo"
                className="aspect-square h-full object-contain"
              />
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
            <p className="pb-5">***** COMPUTER GENERATED STATEMENT *****</p>
          </div>
        </div>
        <FormFooterBtns
          onClose={toggleModal}
          data-html2canvas-ignore
          btnText="Generate PDF"
          onSubmit={handlePrint}
        />
      </div>
    </Modal>
  );
};

export default ReceiptModal;
