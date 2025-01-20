import "./loaders.css";

function Loader({ cover }: { cover?: boolean }) {
  return (
    <section className={`dots-container ${cover ? "" : "min-w-[70vw] min-h-[30vh]"} `}>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </section>
  );
}

export default Loader;
