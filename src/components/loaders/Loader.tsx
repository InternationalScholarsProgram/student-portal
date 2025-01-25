import Modal from "../Modal";
import "./loaders.css";

function Loader({ cover }: { cover?: string }) {
  return (
    <section className={`dots-container ${cover} `}>
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
      <div className="p-2">
        <Loader />
      </div>
    </Modal>
  );
}
export function InlineLoader() {
  return <Loader cover="h-full" />;
}

export default Loader;
