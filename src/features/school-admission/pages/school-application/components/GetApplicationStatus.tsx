import { useState } from "react";
import CopyToClipBoard from "../../../../../components/CopyToClipBoard";
import SchoolFeedBackModal from "./SchoolFeedBackModal";
import FeedBackStatus from "./FeedBackStatus";
type Props = {
  status: string;
  school?: any;
};

const GetApplicationStatus = ({ status, school }: Props) => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  const userName = school?.application_details?.username;
  const password = school?.application_details?.password;
  const comment = school?.application_details?.comment;
  const feedbackCode =
    school?.application_details?.feedback?.feedback?.toString();

  if (status === "1")
    return (
      <>
        <p>
          Status : Application Request{" "}
          <span className="text-secondary-main px-1">Received</span>
        </p>
        <p className="opacity-70 text-base">
          Our team has received your application and is currently processing it
        </p>
      </>
    );
  if (status === "9")
    return (
      <>
        <p>
          Status :<span className="text-secondary-main px-1">Applied</span>
        </p>
        <p className="opacity-70">
          Your application has been completed. Do not act on any emails you
          receive from the school without first seeking guidance from our team
          by raising a ticket. <br />
        </p>
        {comment && (
          <span className="">
            <b className="">Admin Comments : </b>
            <em>{comment}</em>
          </span>
        )}
        <p className="font-semibold opacity-75">School portal Access</p>
        {school?.isinto ? (
          <em className="pb-3">
            Your application is processed through a special platform. You will
            not have login access until the school makes a decision. Login
            credentials will be shared by ISP staff upon offer
          </em>
        ) : (
          <>
            <div className="px-4 m-2 border-30 rounded-md">
              <p>
                School Portal :
                <a
                  className="text-primary-light underline px-2"
                  href={school?.application_details?.school_link || "#"}
                  target="_blank"
                >
                  Open Link
                </a>
              </p>
              <p className="row items-center w-full">
                UserName : {"  "}
                <span className="pl-1 flex-1 max-w-fit text-nowrap truncate text-ellipsis">
                  {userName}
                </span>{" "}
                <CopyToClipBoard text={userName} />
              </p>
              <p>
                Password : {password}
                <CopyToClipBoard text={password} />
              </p>
            </div>
          </>
        )}

        <div className="col">
          <b>Feedback</b>
          {feedbackCode ? (
            <FeedBackStatus school={school} />
          ) : (
            <>
              <p>
                Once you receive the admission decision from this school, please
                ensure you submit the feedback below. <strong>Failure</strong>{" "}
                to submit the decision, you will <strong>NOT BE ABLE</strong> to
                proceed to the next stage of processing your funding.
              </p>
              <button className="text-btn self-end" onClick={toggleModal}>
                Submit School Decision
              </button>
            </>
          )}
        </div>
        <SchoolFeedBackModal
          open={open}
          toggleModal={toggleModal}
          school={school}
        />
      </>
    );
  if (status === "11")
    return (
      <>
        <p>
          Status :<span className="text-error-main px-2">Rejected</span>
        </p>
        <p className="opacity-70 text-base">
          Your application has been rejected by our team. Kindly request another
          career advisory or resubmit your application.
        </p>
        {comment && (
          <>
            <p className="underline">Comments</p>
            <em>{comment}</em>
          </>
        )}
      </>
    );
  return (
    <>
      <p>Status : Processing</p>
      <p className="opacity-70 text-base">
        Your application is currently being processed by our team.
      </p>
    </>
  );
};
export default GetApplicationStatus;
