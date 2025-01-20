import Modal from "../../../../components/Modal";
import BookingMessages from "./BookingMessages";

function OrderHistoryModal({ open, setOpen, selectedOrder }: any) {
  return (
    <Modal open={open} setOpen={setOpen} title="Order Details">
      <div className="p-6">
        <BookingMessages row={selectedOrder} />
      </div>
    </Modal>
  );
}

export default OrderHistoryModal;
