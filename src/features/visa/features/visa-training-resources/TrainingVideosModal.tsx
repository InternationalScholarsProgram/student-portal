import Modal from "../../../../components/Modal";
import useVisa from "../../services/hooks/useVisa";
import FormFooterBtns from "../../../../components/buttons/FormFooterBtns";
import { CounterModal, VisaVideos } from "../../types/visaTypes";
import { useState } from "react";
import visaEndpoints from "../../services/visaEndpoints";

const TrainingVideosModal: React.FC<CounterModal> = ({
  open,
  toggleModal,
  updateCounter,
}) => {
  const { visa } = useVisa();
  const counter = visa.video_counter;
  const [showVideo, setShowVideo] = useState(false);
  const [video, setVideo] = useState<VisaVideos>();
  
  const onClose = () => {
    setShowVideo(false);
    toggleModal();
    setVideo(undefined);
  };

  const getVideo = async () => {
    try {
      const _video = await visaEndpoints.visaTrainingVideo();
      setVideo(_video);
      return _video;
    } catch (error) {
      console.log(error);
    }
  };
  const videosLeft = counter === 1 ? "video left" : "videos left";

  const onSubmit = async () => {
    if (!showVideo) setShowVideo(true);

    const newVideo = await getVideo();
    if (!newVideo) setShowVideo(false);
    // update counter
    updateCounter.mutate("videos");
  };

  return (
    <Modal
      title={`Visa Training Videos ${
        showVideo && counter > 0 ? `(${counter} ${videosLeft})` : ""
      }`}
      open={open}
      setOpen={toggleModal}
    >
      <div className=" w-[80vw] md:w-[60vw] xl:w-[40vw] col p-3">
        {showVideo ? (
          <div className="col">
            <h4 className="text-center font-semibold">{video?.det_desc}</h4>
            <iframe className="w-full aspect-video" src={video?.det_link} />
          </div>
        ) : counter > 0 ? (
          <p>
            You have {counter} {videosLeft} to view. Please note you will only
            be allowed to watch each visa training video only once. Do you want
            to continue?
          </p>
        ) : (
          <p>You have watched all available visa training videos</p>
        )}
        <FormFooterBtns
          onClose={onClose}
          btnText={
            !showVideo
              ? "Continue"
              : updateCounter.isPending
              ? "Loading..."
              : "Next"
          }
          onSubmit={onSubmit}
          hideBtn={counter > 0 ? false : true}
        />
      </div>
    </Modal>
  );
};

export default TrainingVideosModal;
