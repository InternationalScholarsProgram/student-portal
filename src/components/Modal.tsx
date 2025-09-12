import { Modal as MuiModal } from "@mui/material";

interface CustomModalProps {
  children: React.ReactNode;
  title?: string;
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal({ children, title, open, setOpen }: CustomModalProps) {
  const toggleModal = () => {
    if (setOpen) setOpen(!open);
  };
  return (
    <MuiModal className="" open={open} onClose={toggleModal}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-default rounded-lg border-none outline-none overflow-y-auto">
        {setOpen && (
          <>
            <div className="p-4 flex justify-between items-center">
              <h5 className="first-letter:uppercase text-lg font-semibold text-primary-main">
                {title}
              </h5>
              <button
                type="button"
                className="opacity-50 hover:opacity-75 hover:outline-2 rounded-full text-2xl"
                aria-label="Close"
                onClick={toggleModal}
              >
                ✕
              </button>
            </div>
            <div className="border-b-30 mx-2" />
          </>
        )}
        {children}
      </div>
    </MuiModal>
  );
}
export default Modal;
