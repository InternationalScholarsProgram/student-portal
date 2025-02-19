import React, { useState } from "react";
import { Link } from "react-router-dom";
import DS160RequestModal from "./DS160RequestModal";
import useVisa from "../../services/hooks/useVisa";

function DS160req() {
  const { applicationVideo, ds160Req } = useVisa();
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  return (
    <div>
      {ds160Req?.reviewed === 0 && (
        <section className="col card my-5 gap-4 p-3">
          <p>
            Your request to access the DS-160 instruction resource is pending
            approval. Please allow some time for the review process to be
            completed.
          </p>
          <p>
            If you need urgent assistance or have any questions, feel free to
            reach out to our support team.
          </p>
          <p>Thank you for your patience and understanding.</p>
          <div className="row justify-end">
            <Link to="/create-ticket" className="primary-btn">
              Create Ticket
            </Link>
          </div>
        </section>
      )}
      {ds160Req?.reviewed === 1 && (
        <section className="col my-5 gap-4">
          <p>
            Your request to access DS-160 instruction resource has been approved
          </p>
          <div className="card col p-4 gap-3">
            <span className="text-sm">
              Please watch the video below to understand how to fill your DS-160
            </span>
            <iframe
              width="100%"
              className="aspect-video"
              src={applicationVideo?.det_link}
              title={applicationVideo?.det_desc}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <footer className="row justify-end gap-3">
            <Link
              to="https://ceac.state.gov/genniv/"
              target="_blank"
              className="text-btn"
            >
              Complete your DS-160
            </Link>
            <button onClick={toggleModal} className="primary-btn">
              Request Review
            </button>
          </footer>
          <DS160RequestModal open={open} toggleModal={toggleModal} />
        </section>
      )}
    </div>
  );
}

export default DS160req;
