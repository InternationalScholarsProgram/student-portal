import { Modal } from "@mui/material";
const dots = [1, 2, 3, 4, 5];

function Loader() {
  return (
    <div className="h-full w-full flex-1 col-center">
      <section className="dots-container">
        {dots.map((dot) => (
          <div key={dot} className="dot" />
        ))}
      </section>
    </div>
  );
}
export function FullLoader() {
  return (
    <Modal
      sx={{
        outline: "0px dotted transparent",
        border: "0px dotted transparent",
      }}
      open={true}
    >
      <div className="w-full h-full flex-1 col-center" children={<Loader />} />
    </Modal>
  );
}
export function InlineLoader() {
  return <Loader />;
}

export default Loader;
