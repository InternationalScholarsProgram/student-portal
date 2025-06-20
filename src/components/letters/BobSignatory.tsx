import bobSig from "../../assets/BobMwitiSign.png";

const BobSignatory = () => {
  return (
    <div className="">
      <b>Sincerely,</b>
      <div className="col py-2">
        <img src={bobSig} alt="logo" height="120px" width="110px" />

        <b>Bob Mwiti</b>
        <b>Managing Director & CEO</b>
        <b>The International Scholars Program</b>
        <b>{"  "}</b>
      </div>
    </div>
  );
};

export default BobSignatory;
