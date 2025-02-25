import { useMutation } from "@tanstack/react-query";
import Modal from "../../../../../../components/Modal";
import { ModalProps } from "../../../../../../types";
import useAdmissions from "../../../../services/useAdmissions";
import {
  capitalizeFirstCharacter,
  formatDate,
} from "../../../../../../utils/utils";
import FormFooterBtns from "../../../../../../components/buttons/FormFooterBtns";
import { ispLogo } from "../../../../../../assets/imageLinks";
import { generateBlob } from "../../../../../user/contracts/utils/utils";
import { admissionAPIs } from "../../../../services/admissionAPIs";
import { toast } from "react-toastify";
import { useRef } from "react";
import { FullLoader } from "../../../../../../components/loaders/Loader";

const TranscriptsModal = ({ open, toggleModal }: ModalProps) => { 
  const { transcripts, user, queryKeys, queryClient } = useAdmissions();
  const name = capitalizeFirstCharacter(user?.fullnames);
  const targetRef = useRef<HTMLDivElement>(null);

  const requestLetter = useMutation({
    mutationFn: async () => {
      if (!targetRef.current) throw new Error("No ref");
      if (targetRef?.current.style.backgroundColor !== "white") {
        targetRef.current.style.backgroundColor = "white";
        targetRef.current.style.color = "black";
      }
      const docs = await generateBlob(name, targetRef.current, 0.5);
      const payload = {
        name: name,
        docs: docs,
        proposed_course_id: transcripts?.requirements.map(
          (item) => item.proposed_course
        ),
      };
      return await admissionAPIs.updateTranscripts(payload);
    },
    onSuccess: (response) => {
      if (response?.status === 200) {
        toast.success(response?.data.message);
        toggleModal();
        queryClient.invalidateQueries({ queryKey: queryKeys.transcripts });
      }
    },
  });
  return (
    <Modal title="Request Letter" open={open} setOpen={toggleModal}>
      <section className="w-[90vw] md:w-[60vw] xl:w-[40vw] col p-3 contract overflow-y-auto h-[90dvh]">
        <div className="w-full contract" ref={targetRef}>
          <div className="col-center py-3">
            <img
              src={ispLogo}
              alt="ISP logo"
              className="rounded mx-auto"
              width="140px"
            />
            <h6 className="text-center font-semibold mt-2 text-lg">
              The International Scholars Program
            </h6>
          </div>

          <p>{formatDate(new Date())}</p>

          <div className="col gap-2">
            <p>Dear Sir/Madam,</p>

            <h6 className="font-semibold text-lg underline ">
              Subject: Urgent Request for Academic Transcript Verification and
              Transmission
            </h6>

            <p className="text-justify ">
              The International Scholars Program (ISP) is currently in the
              process of verifying the academic transcripts submitted by{" "}
              <b>{user?.fullnames}</b>, who has informed us they attended your
              esteemed institution. The student is currently enrolled in ISP and
              seeking graduate study opportunities abroad.
            </p>

            <p>
              To facilitate this verification, we kindly request that you
              provide us with the official academic documents directly via email
              at the address below:
            </p>

            <p className="mt-2">
              <b>Email Address:</b>
              <a
                href="mailto:verification@internationalscholarsprogram.com"
                className="text-primary-light hover:underline ml-1"
              >
                verification@internationalscholarsprogram.com
              </a>
            </p>
            {transcripts.school_count > 0 && (
              <p>
                Additionally, we request that you copy the following institution
                in the same email:
              </p>
            )}
            <ol className="mx-3 px-3 list-decimal">
              {transcripts?.requirements.map((school) => {
                if (school.ver_status === "2" || school.ver_status === "1")
                  return null;

                return (
                  <li key={school.proposed_course}>
                    <p className="mt-2">{school.school_name}</p>
                    <p>
                      Email Address:{" "}
                      <a
                        href={`mailto:${school.verification_email}`}
                        className="text-primary-light hover:underline ml-1"
                      >
                        {school.verification_email}
                      </a>
                    </p>
                  </li>
                );
              })}
            </ol>

            <p>
              Moreover, please copy <b>{user?.fullnames}</b> in the email:
              <br />
              <b>Email Address:</b>
              <a
                href={`mailto:${user?.email}`}
                className="text-primary-light hover:underline ml-1"
              >
                {user?.email}
              </a>
            </p>
            <div>
              <p>
                Please ensure that the documents are clear and legible when
                shared.
              </p>
              <p>
                If there are any associated fees or additional forms that the
                student must complete to fulfill this request, kindly inform
                them at your earliest convenience so they can take the necessary
                steps.
              </p>

              <p>
                Your prompt assistance in this matter is greatly appreciated.
              </p>
              <p>
                Please do not hesitate to contact us if you require further
                information.
              </p>
            </div>
          </div>
          <div>
            <b>Sincerely,</b>
            <b>Credentials Verification Team</b>
            <b>The International Scholars Program</b>
          </div>
        </div>
        {requestLetter.isPending && <FullLoader />}
        <FormFooterBtns
          onClose={toggleModal}
          btnText={
            requestLetter.isPending ? "Downloading..." : "Download Letter"
          }
          onSubmit={async () => {
            // if (targetRef.current) {
            //   targetRef.current.style.backgroundColor = "white";
            //   targetRef.current.style.color = "black";
            // }
            // const docs = await generateBlob(name, targetRef.current, 0.5);
            // docs.download();
            requestLetter.mutateAsync();
          }}
        />
      </section>
    </Modal>
  );
};
export default TranscriptsModal;
