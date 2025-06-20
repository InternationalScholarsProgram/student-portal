import { ispLogo } from "../../assets/imageLinks";

const LetterHead = () => {
  return (
    <header className="col w-fit">
      <img
        src={ispLogo}
        alt="ISP logo"
        className="rounded mx-auto"
        width="140px"
      />
    </header>
  );
};

export default LetterHead;
