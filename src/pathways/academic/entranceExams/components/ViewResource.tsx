import { ModalProps } from "../../../../types";
import Modal from "../../../../components/Modal";
import FormFooterBtns from "../../../../components/buttons/FormFooterBtns";
import { BASE_URL } from "../../../../services/api/base";
import { Resources } from "../types/examTypes";

type Props = ModalProps & {
  resource: Resources | undefined;
};

const ViewResource: React.FC<Props> = ({ open, toggleModal, resource }) => {
  const url = `${BASE_URL}/login/member/dashboard/exam_resources/${resource?.link}`;

  return (
    <Modal open={open} setOpen={toggleModal} title={resource?.title}>
      <div
        className={
          // resource?.type === "document"
          //   ?
          "col gap-2 w-[98vw] md:w-[80vw] h-[90vh] p-2"
          // : "modal h-[70vh]"
        }
      >
        {resource?.type === "video" && (
          <video controls className="flex-1 aspect-video" autoPlay>
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {resource?.type === "document" && (
          <iframe src={url} title="PDF Preview" className="flex-1">
            <p>
              Your browser doesn't support embedded PDFs.
              <a href={url} target="_blank" rel="noopener noreferrer">
                Download PDF
              </a>
            </p>
          </iframe>
        )}

        <FormFooterBtns onClose={toggleModal} hideBtn />
      </div>
    </Modal>
  );
};

export default ViewResource;
