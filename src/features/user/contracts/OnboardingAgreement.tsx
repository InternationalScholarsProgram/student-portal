import React, { useState } from "react";
import axios from "axios";
import useFetchUser from "../../../services/hooks/useFetchUser";
import { useLocation } from "react-router";
import { ispLogo, ispStamp } from "../../../assets/imageLinks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchIp, formatDate, json2formData } from "../../../utils/utils";
import RegularStudent from "./contract-letters/RegularStudent";
import PrimeStudent from "./contract-letters/PrimeStudent";
import { FullLoader } from "../../../components/loaders/Loader";
import api from "../../../services/api/base";
import { usePDF } from "react-to-pdf";
import InputField from "../../../components/inputs/InputField";

type OnboardingAgreementProps = {
  action?: string;
};

const saveContract = async (data: any) => {
  try {
    // Generate PDF and save it to the server

    // const red = {
    //   pdf: pdf.output("blob"),
    //   username: "<?php echo $username; ?>",
    //   token: "<?php echo $token; ?>",
    // };

    // Create form data to send to server
    const formData = json2formData(data);

    // Send the PDF to the server
    const response = await api.post("save_pdf.php?action=contract", formData);
    if (response.status === 200) {
      // After saving the PDF in the database, initiate download
      // html2pdf().set(opt).from(element).save();
      // pdf.save(`${data.name}.pdf`);
    }

    // Send PDF data to server to save in the database
  } catch (error) {
    toast.error("Error generating PDF. Please try again.");
  }
};

const version = "V 3.0";
const OnboardingAgreement: React.FC<OnboardingAgreementProps> = () => {
  const { user } = useFetchUser();
  const { state } = useLocation();
  const name = user?.fullnames
    ?.toLowerCase()
    ?.replace(/\b[a-z]/g, function (letter: string) {
      return letter?.toUpperCase();
    });
  document.title = `${name} Onboarding Agreement`;
  const { toPDF, targetRef } = usePDF({ filename: name });
  const [signed, setSigned] = useState(false);
  const { data: ipData } = useQuery({
    queryKey: ["ip"],
    queryFn: fetchIp,
  });

  const handleSignContract = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const payload = {
      // pdf: pdf.output("blob"),
      username: user?.fullnames,
      token: state?.token,
    };
    console.log(payload);
    signContract.mutate();
  };

  const signContract = useMutation({
    // mutationFn: saveContract,
    mutationFn: fetchIp,
    onSuccess: () => {
      setSigned(true);
      toast.success("Contract signed successfully.");
      const generatePdf = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            toPDF({
              canvas: { qualityRatio: 1.1 },
              resolution: 3,
            });
            resolve(true); // Resolve the promise when successful
          } catch (error) {
            reject(error); // Reject the promise if there's an error
          }
        }, 1000);
      });
      toast.promise(generatePdf, {
        pending: "Generating PDFs...",
        success: "Contract Pdf Generated 👌",
        error: "Something went wrong 🤯",
      });
    },
    onError: (error) => {
      toast.error("Error signing contract. Please try again.");
      console.error("Error signing contract:", error);
    },
  });

  if (!user?.fullnames) return <FullLoader />;
  return (
    <>
      <main ref={targetRef} className="content-width p-8">
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
            <form className="col gap-2" onSubmit={handleSignContract}>
              <div className="col px-2 gap-2">
                <label>
                  <strong>Full Name: </strong>
                </label>
                <InputField
                  type="text"
                  value={user?.fullnames || ""}
                  required
                />
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
      </main>
      {signed === true && (
        <div className="flex flex-row-reverse w-full">
          <button
            className="primary-btn self-end m-2 mr-6"
            onClick={() =>
              toPDF({
                canvas: { qualityRatio: 1.1 },
                resolution: 3,
              })
            }
          >
            Download Contract
          </button>
        </div>
      )}
      {signContract.isPending && <FullLoader />}
    </>
  );
};

export default OnboardingAgreement;
