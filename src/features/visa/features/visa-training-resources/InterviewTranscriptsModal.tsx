import Modal from "../../../../components/Modal";
import useVisa from "../../services/hooks/useVisa";
import FormFooterBtns from "../../../../components/buttons/FormFooterBtns";
import { CounterModal, Transcripts, VisaVideos } from "../../types/visaTypes";
import { useState } from "react";
import visaEndpoints from "../../services/visaEndpoints";
import api from "../../../../services/api/base";
import { Chip } from "@mui/material";

const InterviewTranscriptsModal: React.FC<CounterModal> = ({
  open,
  toggleModal,
  updateCounter,
}) => {
  const { visa } = useVisa();
  const counter = visa?.transcript_counter;
  const videosLeft = counter === 1 ? "transcript left" : "transcripts left";
  const [showTranscript, setShowTranscript] = useState(false);
  const [transcript, setTranscript] = useState<Transcripts | null>();
  const outcome = transcript?.visa_outcome;

  const onClose = () => {
    setShowTranscript(false);
    toggleModal();
    setTranscript(null);
  };

  const getVideo = async () => {
    try {
      const _video = await visaEndpoints.visaTranscript();
      setTranscript(_video);
      return _video;
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    if (!showTranscript) setShowTranscript(true);

    const newVideo = await getVideo();
    if (!newVideo) setShowTranscript(false);
    // update counter
    updateCounter.mutate("transcripts");
  };

  return (
    <Modal
      title={`Visa interview transcripts ${
        showTranscript && counter > 0 ? `(${counter} ${videosLeft})` : ""
      }`}
      open={open}
      setOpen={toggleModal}
    >
      <div className=" w-[80vw] md:w-[60vw] xl:w-[40vw] col p-3">
        {showTranscript ? (
          <div className="transcript-details max-h-[70vh] overflow-y-auto">
            <p>
              Visa Outcome :
              <span>
                <Chip
                  color={outcome === "1" ? "success" : "default"}
                  label={
                    outcome === "1"
                      ? "Approved"
                      : outcome === "2"
                      ? "Denied"
                      : "Administrative"
                  }
                />
              </span>
            </p>
            <p>
              High School Grade :<span>{transcript?.kcse_grade}</span>
            </p>
            {/* <p>County : <span>{transcript?.county}</span></p> */}
            <p>
              Mock Score :<span>{transcript?.mock_score}</span>
            </p>
            <p>
              Interview Date :<span>{transcript?.interview_date}</span>
            </p>
            <p>
              School : <span>{transcript?.school}</span>
            </p>
            <p>
              Program :<span>{transcript?.program}</span>
            </p>
            <p>
              Interview Feedback :<span>{transcript?.interview_feedback}</span>
            </p>
          </div>
        ) : counter > 0 ? (
          <p>
            You have {counter} {videosLeft} to view. Please note you will only
            be allowed to read each Visa Transcript once.
            <br />
            Do you want to continue?
          </p>
        ) : (
          <p>You have read all the available visa interview transcripts</p>
        )}
        <FormFooterBtns
          onClose={onClose}
          btnText={
            !showTranscript
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

export default InterviewTranscriptsModal;
const checkPayment = async () => {
  try {
    const response = await api.get(
      `/login/member/dashboard/check_sevis_payment.php`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
  //   $.ajax({
  //     type: 'POST',
  //     url: 'check_sevis_payment.php',
  //     dataType: 'html',
  //     success: function(response) {
  //         // Extract the JSON part from the HTML response
  //         var jsonResponse = response.substring(response.indexOf('</head>') + 7).trim();
  //         var responseData = JSON.parse(jsonResponse);

  //         if (responseData.status == 'success') {
  //             if (responseData.exists && responseData.statusColumn == '2') {
  //                 $('#sevis_payment').show();

  //                 $('#sevis_payment_select').change(function() {
  //                     var sevisPayment = $(this).val();
  //                     if (sevisPayment == 'No') {
  //                         $('#sevis_confirm').show();
  //                         $('#sevis_confirm_select').change(function() {
  //                             var sevisConfirm = $(this).val();
  //                             if (sevisConfirm == 'Yes') {
  //                                 $('#sevis_details').show();
  //                             } else {
  //                                 $('#sevis_details').hide();
  //                             }
  //                         });
  //                     } else {
  //                         $('#sevis_confirm').hide();
  //                         $('#sevis_details').hide();
  //                     }
  //                 });
  //             } else if (!responseData.exists || responseData.statusColumn == '3') {
  //                 // SEVIS payment does not exist, ask the user if they want to request payment
  //                 $('#sevis_payment').show();
  //                 $('#sevis_payment_select').change(function() {
  //                     var sevisPayment = $(this).val();
  //                     if (sevisPayment == 'No') {
  //                         $('#sevis_confirm').show();
  //                         $('#sevis_confirm_select').change(function() {
  //                             var sevisConfirm = $(this).val();
  //                             if (sevisConfirm == 'Yes') {
  //                                 $('#sevis_details').show();
  //                             } else {
  //                                 $('#sevis_details').hide();
  //                             }
  //                         });
  //                     } else {
  //                         $('#sevis_payment').hide();
  //                         $('#sevis_confirm').hide();
  //                         $('#sevis_confirm_select').hide();
  //                         $('#sevis_details').hide();

  //                     }
  //                 });
  //             } else if (responseData.exists && responseData.statusColumn == '1') {
  //                 // SEVIS payment does not exist, inform the user that the request is being processed
  //                 Swal.fire({
  //                     title: 'Sevis Fee Request.',
  //                     text: 'Your SEVIS fee request has been received and is being processed',
  //                     icon: 'success',
  //                     showCancelButton: false,
  //                     confirmButtonText: 'Okay'
  //                 }).then((result) => {
  //                     // Handle the user's action if needed
  //                 });
  //             } else if (responseData.exists && responseData.statusColumn == '4') {
  //                 $('#sevis_payment').hide();
  //                 $('#sevis_confirm_select').hide();
  //                 $('#sevis_confirm').hide();
  //                 $('#sevis_details').hide();
  //             }
  //         } else {
  //             alert('Error: ' + responseData.message);
  //         }
  //     },
  // });
};
