import Box from "@mui/material/Box";
import { Modal as MuiModal } from "@mui/material";

interface CustomModalProps {
  children: React.ReactNode;
  title?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal({ children, title, open, setOpen }: CustomModalProps) {
  return (
    <MuiModal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          // p: 2,
        }}
      >
        {/* Modal Header */}
        <div className="p-4 flex justify-between items-center">
          <h5 className="first-letter:uppercase text-lg font-semibold">{title}</h5>
          <button
            type="button"
            className="opacity-50 hover:opacity-75 hover:outline-2 rounded-full text-2xl"
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="borders-b-30 mx-2" />
        {children}
      </Box>
    </MuiModal>
  );
}
export default Modal;
