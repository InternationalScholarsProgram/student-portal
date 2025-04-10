import { ispLogo } from "../../assets/imageLinks";

const LetterHead = ({ title }: { title?: string }) => {
  return (
    <header className="col w-fit">
      <img
        src={ispLogo}
        alt="ISP logo"
        className="rounded mx-auto"
        width="140px"
      />
      {/* <h4 className="font-bold">
        {title || "The International Scholars Program"}
      </h4> */}
    </header>
  );
};

export default LetterHead;
