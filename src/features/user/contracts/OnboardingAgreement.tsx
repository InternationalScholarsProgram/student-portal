import React, { useState } from "react";
import axios from "axios";
import useFetchUser from "../../../services/hooks/useFetchUser";
import { useLocation } from "react-router";
import { ispLogo, ispStamp } from "../../../assets/imageLinks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  capitalize,
  delay,
  fetchIp,
  formatDate,
  json2formData,
} from "../../../utils/utils";
import RegularStudent from "./contract-letters/RegularStudent";
import PrimeStudent from "./contract-letters/PrimeStudent";
import { FullLoader } from "../../../components/loaders/Loader";
import api from "../../../services/api/base";
import { usePDF } from "react-to-pdf";
import { generateBlob, generatePdf } from "./utils/utils";

type OnboardingAgreementProps = {
  action?: string;
};

const saveContract = async (data: any) => {
  try {
    const formData = json2formData(data);
    console.log(formData, "formData");
    const response = await api.post(
      "login/member/dashboard/APIs/sign_contract.php",
      formData
    );
    return { ...response.data, download: data.download };
  } catch (error) {
    toast.error("Error signing contract. Please try again.");
  }
};

const version = "V 3.0";
const OnboardingAgreement: React.FC<OnboardingAgreementProps> = () => {
  const { user } = useFetchUser();
  const { state } = useLocation();
  
  const name = capitalize(user?.fullnames || "");
  document.title = `${name} Onboarding Agreement`;
  const { toPDF, targetRef } = usePDF({ filename: name });
  const [signed, setSigned] = useState(false);
  const { data: ipData } = useQuery({
    queryKey: ["ip"],
    queryFn: fetchIp,
  });

  const handleSignContract = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    signContract.mutate();
  };

  const getPayLoad = async () => {
    const docs = await generateBlob(name, targetRef.current);
    const file = new File([docs.blob], name, {
      type: "application/pdf",
    });
    const payload = {
      contract: file,
      action: "switch_option",
      token: state?.contract,
      download: docs.download,
    };
    return payload;
  };

  const signContract = useMutation({
    mutationFn: async () => {
      setSigned(true);
      await delay(1000);
      const payload = await getPayLoad();
      console.log(payload);
      return await saveContract(payload);
    },
    onSuccess: (res) => {
      if (res.code === 200) {
        res.download();
        toast.success("Contract signed successfully.");
      }
    },
    onError: () => setSigned(false),
  });

  if (!user?.fullnames) return <FullLoader />;
  return (
    <div className="bg-white text-black">
      <button
        className="primary-btn"
        onClick={() => generatePdf(name, targetRef.current)}
      >
        Test
      </button>
      <main className="content-width p-2 sm:p-8">
        <div ref={targetRef} className="">
          <section className="col" id="form-print">
            <header className="text-center">
              <img
                src={ispLogo}
                alt="ISP logo"
                className="rounded mx-auto"
                width="140px"
              />
              <h4 className="font-bold">
                The International Scholars Program Onboarding Agreement{" "}
                {version}
              </h4>
            </header>
            <h5 className="font-semibold opacity-70 py-3">
              Dear {user?.fullnames}
            </h5>
            <article className="contract">
              {user?.package?.toLowerCase() === "prime" ? (
                <PrimeStudent />
              ) : (
                <RegularStudent />
              )}
            </article>
          </section>
          <footer className="m-3 relative">
            {signed === false ? (
              <form
                data-html2canvas-ignore
                className="col gap-2"
                onSubmit={handleSignContract}
              >
                <div className="col px-2 gap-2">
                  <label>
                    <strong>Full Name: </strong>
                  </label>
                  <div className="border border-black p-2 rounded-md">
                    {user?.fullnames}
                  </div>
                </div>
                <button className="primary-btn self-end" type="submit">
                  Sign Contract
                </button>
              </form>
            ) : (
              <div>
                <div className="row pb-2 gap-2 text-xl">
                  <label>Full Name:</label>
                  <strong>{user?.fullnames}</strong>
                </div>
                <div className="col-center gap-2">
                  <img
                    src={ispStamp}
                    alt="ISP Signed"
                    className="width: 220px; height: 100px;"
                  />
                  <div className="row-center gap-2 flex-wrap">
                    <p>
                      IP Address: <strong>{ipData?.ip}</strong>
                    </p>
                    <p>
                      Date:{" "}
                      <strong>
                        {formatDate(new Date(), "dddd, MMMM D, YYYY , h:mm A")}
                      </strong>
                    </p>
                    <p>
                      Location: <strong>{ipData?.city}</strong>
                    </p>
                    <p>
                      Country: <strong>{ipData?.country_name}</strong>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </footer>
        </div>
      </main>
      {signed === true && (
        <div data-html2canvas-ignore className="flex flex-row-reverse w-full">
          <button
            className="primary-btn self-end m-2 mr-6"
            onClick={() => toPDF()}
          >
            Download Contract
          </button>
        </div>
      )}
      {signContract.isPending && <FullLoader />}
    </div>
  );
};

export default OnboardingAgreement;
