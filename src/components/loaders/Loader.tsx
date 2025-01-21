import "./loaders.css";

function Loader({ cover }: { cover?: boolean }) {
  return (
    <section className={`dots-container ${cover ? "" : ""} `}>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </section>
  );
}

export default Loader;
