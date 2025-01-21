import Modal from "../../../../components/Modal";
import BookingMessages from "./BookingMessages";

function OrderHistoryModal({ open, setOpen, selectedOrder }: any) {
  return (
    <Modal open={open} setOpen={setOpen} title="Order Details">
      <div className="w-[80vw] md:w-[60vw] xl:w-[40vw] p-6">
        <BookingMessages row={{...selectedOrder, setOpen}} />
      </div>
    </Modal>
  );
}

export default OrderHistoryModal;
