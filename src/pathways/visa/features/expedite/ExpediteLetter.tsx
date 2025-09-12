import { Navigate, useLocation } from "react-router";
import { usePDF } from "react-to-pdf";
import useFetchUser from "../../../../services/hooks/useFetchUser";
import { formatDate } from "../../../../utils/utils";
import { FullLoader } from "../../../../components/loaders/Loader";
import { Link } from "react-router-dom";
import { Download } from "@mui/icons-material";
import PrimaryBtn from "../../../../components/buttons/PrimaryBtn";

function ExpediteLetter() {
  const { targetRef, toPDF } = usePDF();
  const { state } = useLocation();
  const { user } = useFetchUser();

  if (!user) return <FullLoader />;
  // if (!state) return <Navigate to="/visa-processing" replace />;

  return (
    <div className="content-container col-center">
      <main ref={targetRef}>
        <header>
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
            <b>{formatDate(state?.visa_interview_date)}</b> at{"  "}
            <b>{state?.visa_interview_time}</b> under IVR Account Number{" "}
            <b>{state?.ivr_account_number}</b>. I am writing to request you to
            kindly reschedule my interview to any date falling before{" "}
            <b>{formatDate(state?.reporting_date)}</b> because the starting date
            for the classes is <b>{formatDate(state?.reporting_date)}</b>.
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

        <div>
          <p>Kind Regards,</p>
          <b>{user?.fullnames}</b>
        </div>
      </main>
      <footer className="row w-full justify-end gap-2 m-2">
        <Link to="/visa-processing" className="text-btn">
          Go Back
        </Link>
        <PrimaryBtn
          onClick={() =>
            toPDF({
              filename: `${user?.fullnames}_Expedite_Letter.pdf`,
              page: {
                format: "A4",
                margin: 5,
                orientation: "portrait",
              },
            })
          }
        >
          <Download /> Download Letter
        </PrimaryBtn>
      </footer>
    </div>
  );
}

export default ExpediteLetter;
