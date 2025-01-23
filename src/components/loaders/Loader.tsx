import { Modal } from "@mui/material";
import "./loaders.css";

function Loader({ cover }: { cover?: string }) {
  return (
    <section
      className={`dots-container ${cover} `}
    >
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </section>
  );
}
export function FullLoader() {
  return (
    <Modal open={true}>
      <Loader />
    </Modal>
  );
}
export function InlineLoader() {
  return <Loader cover="h-full"/>;
}

export default Loader;
