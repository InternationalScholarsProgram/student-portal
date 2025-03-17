import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FundingOptions from "./FundingOptions";
import ContentComponent from "../../../../../../components/ContentComponent";
import { formatDateAndTime } from "../../../../../../utils/utils";
import PrimaryBtn from "../../../../../../components/buttons/PrimaryBtn";
import Modal from "../../../../../../components/Modal";
import { useState } from "react";
import { CalendlyFundingAdvisory } from "../../../../../../components/Calendly";
import useTuition from "../../services/useTuition";

function MeetingStatus() {
  //   const { meetingStatus  } = useTuition();
  const meetingStatus: any = 2;
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);

  switch (meetingStatus) {
    case 1:
      return (
        <ContentComponent
          header={
            <h3 className="p-2 opacity-70 font-semibold row-center w-fit gap-1">
              <CalendarMonthIcon />
              Upcoming Funding Advisory Meeting
            </h3>
          }
        >
          <div className="">
            <p>Greetings,</p>
            <p>
              Your Funding Advisory Meeting is scheduled on{" "}
              <b>{formatDateAndTime(meetingStatus?.message?.date)}</b>
            </p>
            <a
              href={meetingStatus?.message?.zoom_link}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-primary-light"
            >
              Meeting Link
            </a>
          </div>
          <div className="row justify-end gap-3">
            <button onClick={toggleModal} className="text-btn self-end">
              Reschedule Meeting
            </button>
            <PrimaryBtn
              onClick={() =>
                window.open(meetingStatus?.message?.zoom_link, "_blank")
              }
            >
              Join Meeting
            </PrimaryBtn>
          </div>
          <Modal open={open} setOpen={toggleModal} title="Reschedule Meeting">
            <div className="p-3 w-[80vw] md:w-[60vw] xl:w-[45vw] col gap-2">
              <p>
                Kindly note: Please reschedule your meeting if you can't attend
                the current one. Failing to attend a meeting and not
                rescheduling in advance will lead to you <strong>NOT</strong>{" "}
                being able to book another career advisory meeting for{" "}
                <strong>1 day</strong>.
              </p>
              <div className="row justify-end gap-2">
                <button className="text-btn" onClick={toggleModal}>
                  Close
                </button>
                <CalendlyFundingAdvisory
                  url={meetingStatus?.message?.reschedule_url}
                  text="Reschedule"
                />
              </div>
            </div>
          </Modal>
        </ContentComponent>
      );
    case 2:
      return <FundingOptions />;
    case 3:
      return (
        <div>
          <p>You missed the meeting</p>
        </div>
      );
  }
}

export default MeetingStatus;
