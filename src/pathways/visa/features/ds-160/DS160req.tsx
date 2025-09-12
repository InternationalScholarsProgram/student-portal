import React, { useState } from "react";
import { Link } from "react-router-dom";
import DS160RequestModal from "./DS160RequestModal";
import useVisa from "../../services/hooks/useVisa";
import ContentComponent from "../../../../components/ContentComponent";
import ContactSupport from "../../../../components/ContactSupport";
import CheckI20 from "./CheckI20";
import { useQuery } from "@tanstack/react-query";
import visaEndpoints from "../../services/visaEndpoints";

function DS160req() {
  const { ds160Req } = useVisa();
  
  const { data: applicationVideo } = useQuery({
    queryKey: ["visa", "ds-160-application-video"],
    queryFn: visaEndpoints.ds_160_application_video,
  });
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  return (
    <div>
      {ds160Req?.reviewed === 0 ? (
        <ContentComponent
          header="Request to access the DS-160 instruction resource"
          className="my-5 gap-4"
          childrenClassName="gap-1"
        >
          <p>
            Your request to access the DS-160 instruction resource is pending
            approval. Please allow some time for the review process to be
            completed.
          </p>
          <ContactSupport />
        </ContentComponent>
      ) : ds160Req?.declined === 0 ? (
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
      ) : (
        <ContentComponent
          className="my-2"
          header="Request to access the DS-160 instruction resource"
        >
          <p>
            Unfortunately, your request has been **rejected**. 😞 Below, you’ll
            find the specific reason provided by our team. Please review it
            carefully and resubmit
          </p>
          <p>
            <strong>Reason for rejection:</strong>
            <em className="px-2">
              {ds160Req?.remark || "No details provided."}
            </em>
          </p>
          <CheckI20 />
        </ContentComponent>
      )}
    </div>
  );
}

export default DS160req;
