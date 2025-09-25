import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DS160RequestModal from "./DS160RequestModal";
import useVisa from "../../services/hooks/useVisa";
import ContentComponent from "../../../../components/ContentComponent";
import ContactSupport from "../../../../components/ContactSupport";
import CheckI20 from "./CheckI20";
import { useQuery } from "@tanstack/react-query";
import visaEndpoints from "../../services/visaEndpoints";
import Loader, { SkeletonLoader } from "../../../../components/loaders/Loader";

function DS160req() {
  const { ds160Req } = useVisa();

  const {
    data: applicationVideo,
    isLoading: isLoadingVideos,
    isError: isVideoError,
  } = useQuery({
    queryKey: ["visa", "ds-160-application-video"],
    queryFn: visaEndpoints.ds_160_application_video,
  });

  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);

  const videos = useMemo(() => {
    if (applicationVideo?.data?.data && Array.isArray(applicationVideo.data.data)) {
      return applicationVideo.data.data.filter((v: any) => v?.det_link);
    }
    if (applicationVideo?.data && Array.isArray(applicationVideo.data)) {
      return applicationVideo.data.filter((v: any) => v?.det_link);
    }
    if (Array.isArray(applicationVideo)) {
      return applicationVideo.filter((v: any) => v?.det_link);
    }
    return [];
  }, [applicationVideo]);

  const hasVideos = videos.length > 0;

  const [idx, setIdx] = useState(0);
  const current = hasVideos ? videos[Math.min(idx, videos.length - 1)] : null;

  const isFirst = idx <= 0;
  const isLast = idx >= videos.length - 1;

  const next = () => {
    if (!isLast) setIdx((i) => i + 1);
  };
  const prev = () => {
    if (!isFirst) setIdx((i) => i - 1);
  };

  const VideoCarousel = () => {
    if (isLoadingVideos) return <SkeletonLoader />;

    if (isVideoError || !hasVideos) {
      return (
        <div className="card col p-4 gap-2">
          <p>No videos found right now. Please check back shortly.</p>
          <ContactSupport />
        </div>
      );
    }

    return (
      <div className="card col p-4 gap-3">
        <span className="text-sm">
          Please watch the videos below to understand how to fill your DS-160.
        </span>

        <div className="col gap-2">
          <div className="relative">
            <iframe
              key={current?.det_id ?? idx}
              width="100%"
              className="aspect-video rounded-md"
              src={current?.det_link}
              title={
                current?.det_desc ||
                current?.slide_name ||
                `DS-160 Tutorial ${idx + 1}`
              }
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Controls */}
          <div className="row items-center justify-between mt-2">
            <button
              type="button"
              onClick={isFirst ? undefined : prev}
              disabled={isFirst}
              aria-disabled={isFirst}
              className={`primary-border-btn ${
                isFirst ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
              }`}
            >
              ‹ Previous
            </button>

            <div className="text-sm opacity-70">
              {idx + 1} / {videos.length}
            </div>

            <button
              type="button"
              onClick={isLast ? undefined : next}
              disabled={isLast}
              aria-disabled={isLast}
              className={`primary-btn ${
                isLast ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
              }`}
            >
              Next ›
            </button>
          </div>

          {(current?.det_desc || current?.slide_name) && (
            <p className="text-sm opacity-80">
              {current?.det_desc || current?.slide_name}
            </p>
          )}
        </div>
      </div>
    );
  };

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
          <p>Your request to access DS-160 instruction resource has been approved</p>

          <VideoCarousel />

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
            Unfortunately, your request has been <strong>rejected</strong>. Below,
            you’ll find the reason provided by our team. Please review it and
            resubmit.
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
