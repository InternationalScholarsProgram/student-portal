import React, { useState } from "react";
import axios from "axios";
import useFetchUser from "../../../services/hooks/useFetchUser";
import { useParams } from "react-router";
import { ispLogo } from "../../../assets/imageLinks";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { exportToPDF } from "../../../utils/utils";
import InputField from "../../../components/InputField";
import RegularStudent from "./contract-letters/RegularStudent";
import PrimeStudent from "./contract-letters/PrimeStudent";
import Loader from "../../../components/loaders/Loader";

type OnboardingAgreementProps = {
  action?: string;
};

type IpData = {
  ip: string;
  city: string;
  country_name: string;
};

const fetchIp = async () => {
  try {
    const ipResponse = await axios.get<IpData>("https://ipapi.co/json/");
    const resData: IpData = ipResponse.data;
    return resData;
  } catch (error) {
    console.error("Error fetching IP data:", error);
  }
};

const version = "V 3.0";

const OnboardingAgreement: React.FC<OnboardingAgreementProps> = () => {
  const { user } = useFetchUser();
  const params = useParams();
  const [signed, setSigned] = useState(false);
  const { data: ipData } = useQuery({
    queryKey: ["ip"],
    queryFn: fetchIp,
  });
  const contractRef = React.useRef<HTMLDivElement>(null);
  const generatePdf = async () => {
    try {
      const htmlContent = [contractRef.current?.innerHTML];
      exportToPDF(htmlContent, "Onboarding Agreement", "onboarding-agreement");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Error generating PDF. Please try again.");
    }
  };

  const handleSignContract = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSigned(true);
  };

  if (!user?.fullnames) return <Loader />;
  return (
    <main ref={contractRef} className="content-width list-bullets">
      <section className="col" id="form-print">
        <header className="text-center">
          <img
            src={ispLogo}
            alt="ISP logo"
            className="rounded mx-auto"
            width="140px"
          />
          <h4 className="font-bold">
            The International Scholars Program Onboarding Agreement {version}
          </h4>
        </header>
        <h5 className="font-semibold opacity-70 py-3">
          Dear {user?.fullnames}
        </h5>
        <article className="col mx-1 gap-3 contract">
          {user?.package?.toLowerCase() !== "prime" ? (
            <PrimeStudent />
          ) : (
            <RegularStudent />
          )}
        </article>
      </section>
      <footer className="m-3">
        <form className="col gap-2" onSubmit={handleSignContract}>
          <div className="col px-2 gap-2">
            <label>
              <strong>Full Name: </strong>
            </label>
            <InputField type="text" value={user?.fullnames || ""} required />
          </div>
          <button className="primary-btn self-end" type="submit">
            Sign Contract
          </button>
        </form>

        {signed && (
          <>
            <div className="text-center">
              <img
                src="imgs/ISP_STAMP.png"
                alt="ISP Signed"
                className="width: 220px; height: 100px;"
              />

              <p>
                IP Address: <span id="ip">{ipData?.ip}</span> &nbsp; &nbsp;
                &nbsp; Date:{" "}
                <span id="current_timestamp">
                  {new Date().toLocaleString()}
                </span>
                &nbsp; &nbsp; Location:{" "}
                <span id="location">{ipData?.city} </span> &nbsp; &nbsp;Country:{" "}
                <span id="Country"> {ipData?.country_name}</span>
              </p>
            </div>{" "}
            <button className="primary-btn my-2" onClick={() => generatePdf()}>
              Download
            </button>
          </>
        )}
      </footer>
    </main>
  );
};

export default OnboardingAgreement;
