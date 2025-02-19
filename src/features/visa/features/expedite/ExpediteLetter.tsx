import { Navigate, useLocation } from "react-router";
import { usePDF } from "react-to-pdf";
import useFetchUser from "../../../../services/hooks/useFetchUser";
import { formatDate } from "../../../../utils/utils";
import { FullLoader } from "../../../../components/loaders/Loader";
import { Link } from "react-router-dom";
import { Download } from "@mui/icons-material";
import { generatePdf } from "../../../user/contracts/utils/utils";
import { useRef } from "react";

interface VisaData {
  admission_date: string;
  ivr: string;
  servis: string;
  university: string;
  visa_date: string;
  visa_time: string;
}

function ExpediteLetter() {
  const { targetRef, toPDF } = usePDF();
  const print = useRef<HTMLDivElement>(null);
  const { state } = useLocation();
  const { user } = useFetchUser();

  if (!user) return <FullLoader />;
  if (!state) return <Navigate to="/visa-processing" replace />;

  return (
    <div className="content-container col-center">
      <main>
        <header className="" ref={targetRef}>
          <b>Head of Consular Section, Visa Services</b>
          <br />
          <b>
            United States Embassy,{" "}
            {user?.country === "kenya" ? "Nairobi-Kenya" : "Harare-Zimbabwe"}.
          </b>
        </header>

        <article className="col gap-2 my-3">
          <div className="col gap-5">
            <p>Dear Sir/Madam,</p>
            <h6 className="title-sm underline">
              REF : REQUEST FOR EXPEDITE OF F1 VISA APPOINTMENT DATE
            </h6>
          </div>
          <p>
            My name is <b>{user?.fullnames}</b>, and I have been admitted to{" "}
            <b>{state?.university}</b> on an education financing scheme to
            pursue a STEM designated master's program under SEVIS No:{" "}
            <b>{state?.sevis_no}</b>.
          </p>
          <p>
            I am scheduled for a visa interview on{" "}
            <b>{formatDate(state?.visa_date)}</b> at{"  "}
            <b>{state?.visa_time}</b> under IVR Account Number{" "}
            <b>{state?.ivr}</b>. I am writing to request you to kindly
            reschedule my interview to any date falling before{" "}
            <b>{formatDate(state?.admission_date)}</b> because the starting date
            for the classes is <b>{formatDate(state?.admission_date)}</b>.
            <br />
          </p>
          <p>
            If I fail to attend school on the scheduled commencement date, I
            will likely lose offers for the full financing I have secured. There
            is no guarantee that these offers will stand beyond the upcoming
            semester.
          </p>
          <p>
            Your kind consideration and quick response will be highly
            appreciated. In case of any questions or clarifications, please do
            not hesitate to contact me.
          </p>
        </article>

        <br />

        <div className="">
          <p>Kind Regards,</p>
          <b className="">{user?.fullnames}</b>
        </div>
      </main>
      <footer className="row w-full justify-end gap-2 m-2">
        <Link to="/" className="text-btn">
          Home
        </Link>
        <button
          onClick={() => {
            // generatePdf(`${user?.fullnames}.pdf`, targetRef.current);
            toPDF({
              filename: `${user?.fullnames}.pdf`,
              page: {
                format: "A4",
                margin: 5,
                orientation: "portrait",
              },
            });
          }}
          className="primary-btn"
        >
          <Download /> Download Letter
        </button>
      </footer>
    </div>
  );
}

export default ExpediteLetter;
