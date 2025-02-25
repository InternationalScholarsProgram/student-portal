import React, { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import SOP from "./SOP";
import { handleStatus, statusClass } from "./TableData";
import { BASE_URL } from "../../../../../services/api/base";
import useAdmissions from "../../../services/useAdmissions";
import { admissionAPIs } from "../../../services/admissionAPIs";
import {
  FullLoader,
  InlineLoader,
} from "../../../../../components/loaders/Loader";
import Modal from "../../../../../components/Modal";
import PickFileButton from "../../../../../components/buttons/PickFileButton";
import PrimaryBtn from "../../../../../components/buttons/PrimaryBtn";
import InputField from "../../../../../components/inputs/InputField";
import ConsentsForm from "../../../components/ConsentsForm";

const docUrl = BASE_URL + "/login/member/dashboard/school_app_docs/";

function DocsModal({ row }: any) {
  const { status, currentIntake, invalidateDocs: invalidate } = useAdmissions();
  const statusData = status?.message;
  const [open, setOpen] = useState(false);
  const [file, setFiles] = useState<File | null>(null);
  const uploadedDocs = row?.uploaded_documents;
  const documentStatus = handleStatus(uploadedDocs)[0];

  const data = {
    school_app_id: statusData?.school_app_id,
    intake_id: currentIntake?.id,
    doc_type_id: row?.id,
    comment: row?.acronym,
  };

  const handleUpload = useMutation({
    mutationFn: async () => {
      const _data =
        uploadedDocs.length === 0
          ? { action: "upload" }
          : {
              current_doc_name: uploadedDocs[0].document_name,
              action: "update",
            };
      return admissionAPIs.uploadFile({ ...data, ..._data, file: file });
    },
    onSuccess: (res: any) => {
      if (res.status === "success") {
        invalidate();
        toast.success(res.message);
        setOpen(false);
        return;
      }
      toast.error(res.message);
    },
  });
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    handleUpload.mutate();
  };
  const viewOnClick = () => {
    console.log(row, "row");
    console.log(statusData, "statusData");

    setOpen(true);
  };

  if (!row || !statusData) return <FullLoader />;
  return (
    <React.Fragment>
      <div className="col-center w-full h-full py-1 leading-none">
        <button onClick={viewOnClick} className="table-btn">
          View
        </button>
      </div>
      <Modal title={row?.item_name} open={open} setOpen={setOpen}>
        <div className="col p-3 w-[80vw] sm:w-[65vw] lg:w-[50vw] xl:w-[38vw]">
          <p className="font-semibold underline opacity-75">Guide</p>
          <div onClick={() => console.log(row)} className="px-3 my-2">
            <p>
              Sample document :
              <a
                href={BASE_URL + row.sample_link}
                className="text-primary-light px-2"
              >
                View
              </a>
            </p>
            <p className="">
              Instructions:
              <span className="px-2 opacity-100 first-letter:uppercase">
                {row.description}
              </span>
            </p>
          </div>
          <p className="font-semibold opacity-75">Document(s)</p>
          {row.id === "3" ? (
            <SOP setOpen={setOpen} data={data} row={row} />
          ) : row.id === "14" ? (
            <ConsentsForm setOpen={setOpen} />
          ) : (
            <form onSubmit={handleOnSubmit} className="py-2">
              <div className="col p-2 card mx-2">
                {uploadedDocs.length === 0 ? (
                  <>
                    <p className="font-semibold opacity-60">
                      Upload {row.item_name}
                    </p>
                    <PickFileButton setFiles={setFiles} />
                    {row.id === "12" && (
                      <div className="col w-4/5 my-2">
                        {/* <label className="text-sm">Comment</label> */}
                        <InputField
                          label="Add Comment"
                          placeholder="Describe the document"
                          required
                          onChange={(e) => (data.comment = e.target.value)}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="row items-center gap-1">
                      <p> Uploaded Document :</p>
                      <a
                        href={docUrl + uploadedDocs[0]?.document_name}
                        target="_blank"
                        className="text-primary-light text-base flex-1 truncate"
                      >
                        {uploadedDocs[0]?.document_name}
                      </a>
                    </div>
                    <div className="row gap-2">
                      <p>Status :</p>
                      <span className={statusClass(documentStatus)}>
                        {documentStatus}
                      </span>
                    </div>
                    {uploadedDocs[0]?.status === 3 && (
                      <div className="col">
                        <p className="font-semibold">Reason for Rejection</p>
                        <div className="px-2">
                          <p className="first-letter:uppercase">
                            {uploadedDocs[0]?.remarks}
                          </p>
                          {uploadedDocs[0]?.remarks && (
                            <p>
                              <a
                                className="text-primary-light"
                                href={docUrl + uploadedDocs[0]?.reject_docname}
                                target="_blank"
                              >
                                View{" "}
                              </a>
                              Suggested Document
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    {uploadedDocs[0]?.status !== 2 && (
                      <>
                        <PickFileButton
                          text="Change File"
                          setFiles={setFiles}
                        />
                        {row.id === "12" && (
                          <div className="col my-2 w-4/5">
                            {/* <label className="text-sm">Comment</label> */}
                            <InputField
                              label="Add Comment"
                              fullWidth={false}
                              placeholder="Describe the document"
                              required
                              value={uploadedDocs[0]?.comment}
                              onChange={(e) => (data.comment = e.target.value)}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
              <div className="row justify-end w-full gap-2 mt-3">
                <button className="text-btn" onClick={() => setOpen(false)}>
                  Close
                </button>
                {uploadedDocs[0]?.status !== 2 && (
                  <PrimaryBtn type="submit">
                    {handleUpload.isPending ? (
                      <InlineLoader />
                    ) : uploadedDocs.length === 0 ? (
                      "Upload"
                    ) : (
                      "Update"
                    )}
                  </PrimaryBtn>
                )}
              </div>
            </form>
          )}
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default DocsModal;
