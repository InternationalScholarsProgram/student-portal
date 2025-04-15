import React from "react";
import { fetchIp, formatDate } from "../../utils/utils";
import { useQuery } from "@tanstack/react-query";
import { ispStamp } from "../../assets/imageLinks";

type Props = {
  name: string;
  isSigned: boolean;
  onSubmit: () => void;
  show?: boolean;
};

const SignContract: React.FC<Props> = ({
  name,
  isSigned,
  onSubmit,
  show = true,
}) => {
  const { data: ipData } = useQuery({
    queryKey: ["ip"],
    queryFn: fetchIp,
  });

  return isSigned ? (
    <div>
      {show && (
        <div className="row pb-2 gap-2 text-xl">
          <label>Full Name:</label>
          <strong>{name}</strong>
        </div>
      )}
      <div className="col items-start justify-center gap-2">
        <img
          src={ispStamp}
          alt="ISP Signed"
          className="width: 220px; height: 100px;"
        />
        <div className="col">
          <p>
            IP Address: <em>{ipData?.ip}</em>
          </p>
          <div className="row-center gap-2 flex-wrap">
            <p>
              Date:{" "}
              <em>{formatDate(new Date(), "dddd, MMMM D, YYYY , h:mm A")}</em>
            </p>
            <p>
              Location: <em>{ipData?.city + ", " + ipData?.country_name}</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <form
      data-html2canvas-ignore
      className="col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {/* <div className="col-center">
        <p>
          The International Scholars Program <br />
          Head Office: 100 S Ashley Drive, Suite 600, Tampa, FL, 33602
          <br />
          Phone: +1 (813) 333 1080
        </p>
        <p>
          E-mail: accounts@internationalscholarsprogram.com &nbsp;&nbsp;<br />
          Website: www.internationalscholarsprogram.com
        </p>
      </div> */}
      <div className="col px-2 gap-2 text">
        <label>
          <strong>Full Name: </strong>
        </label>
        <div className="border border-black p-2 rounded-md">{name}</div>
      </div>
      <button className="primary-btn self-end" type="submit">
        Sign Contract
      </button>
    </form>
  );
};

export default SignContract;
