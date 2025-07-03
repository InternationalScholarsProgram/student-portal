import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Modal from "../../../components/Modal";
import { useState } from "react";
import PrimaryBtn from "../../../components/buttons/PrimaryBtn";
import PrimaryBorderBtn from "../../../components/buttons/PrimaryBorderBtn";
import dayjs from "dayjs";
import CareerAdvisory from "../../../components/career-advisory/CareerAdvisory";
import useAdmissions from "../services/useAdmissions";
import ContactSupport from "../../../components/ContactSupport";

const Meeting = () => {
  const { status } = useAdmissions();
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);

  return (
    <main>
      {status?.meeting_status == "2" ? (
        <>
          <h3 className="p-2 opacity-70 font-semibold row-center w-fit gap-1">
            <CalendarMonthIcon />
            Upcoming Career Advisory Meeting
          </h3>
          <section className="card col p-3 gap-3">
            <div className="">
              <p>Greetings,</p>
              <p>
                Your Career Advisory Meeting is scheduled on{" "}
                <b>
                  {dayjs(status.message.date).format("dddd, MMMM D, YYYY")}{" "}
                </b>{" "}
                at <b>{status.message.time}</b>.
              </p>
              <a
                href={status.message.zoom_link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-primary-light"
              >
                Meeting Link
              </a>
            </div>
            {/* <RequirementsAccordion /> */}
            <div className="row justify-end gap-3">
              <button onClick={toggleModal} className="text-btn self-end">
                Reschedule Meeting
              </button>
              <PrimaryBtn
                onClick={() => window.open(status.message.zoom_link, "_blank")}
              >
                Join Meeting
              </PrimaryBtn>
            </div>
            <Modal open={open} setOpen={toggleModal} title="Reschedule Meeting">
              <div className="p-3 w-[80vw] md:w-[60vw] xl:w-[45vw] col gap-2">
                <p>
                  Kindly note: Please reschedule your meeting if you can't
                  attend the current one. Failing to attend a meeting and not
                  rescheduling in advance will lead to you <strong>NOT</strong>{" "}
                  being able to book another career advisory meeting for{" "}
                  <strong>1 day</strong>.
                </p>
                <div className="row justify-end gap-2">
                  <PrimaryBorderBtn onClick={toggleModal}>
                    Close
                  </PrimaryBorderBtn>
                  <CareerAdvisory
                    url={status.message?.reschedule_url}
                    text="Reschedule"
                  />
                </div>
              </div>
            </Modal>
          </section>
        </>
      ) : (
        <section className="px-4">
          <h3 className="p-2 font-bold opacity-75 text-lg flex items-center gap-2">
            <CalendarMonthIcon />
            Meeting Successfully Attended
          </h3>
          <div className="card p-4 col gap-1">
            <p className="">
              Please wait as our team updates the proposed schools for your
              viewing. This process will be completed within the next 24 hours.
            </p>
            <p className="">Thank you for your patience.</p>
            <ContactSupport />
          </div>
        </section>
      )}
    </main>
  );
};

export default Meeting;
