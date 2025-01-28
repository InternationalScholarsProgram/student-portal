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
      sx={{ outlineColor: "transparent", borderColor: "transparent" }}
      open={true}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Loader />
      </div>
    </Modal>
  );
}
export function InlineLoader() {
  return <Loader />;
}

export default Loader;
