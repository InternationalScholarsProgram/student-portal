import { ModalProps } from "../../../types";
import Modal from "../../../components/Modal";
import FormFooterBtns from "../../../components/buttons/FormFooterBtns";
import { BASE_URL } from "../../../services/api/base";
type Props = ModalProps & {
  resource:
    | {
        category: "quant";
        description: "desc desc desc";
        id: 5;
        link: "6787548566731_1736922245.pdf";
        phase: "1";
        status: 1;
        test_type: "GMAT";
        title: "Resource test";
        type: "video";
        week: 1;
      }
    | any;
};

const ViewResource: React.FC<Props> = ({ open, toggleModal, resource }) => {
  const url =
    BASE_URL + "/login/member/dashboard/exam_resources/" + resource?.link;

  return (
    <Modal open={open} setOpen={toggleModal} title="View Resource">
      <div
        className={
          resource?.type === "video"
            ? "modal"
            : "col w-[98vw] md:w-[80vw] h-[90vh]"
        }
      >
        {resource?.type === "video" ? (
          <video controls>
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <iframe src={url} title="PDF Preview" className="flex-1">
            <p>
              Your browser doesn't support embedded PDFs.
              <a href={url} target="_blank" rel="noopener noreferrer">
                Download PDF
              </a>
            </p>
          </iframe>
        )}

        <FormFooterBtns onClose={toggleModal} btnText="Mark Complete" />
      </div>
    </Modal>
  );
};

export default ViewResource;
