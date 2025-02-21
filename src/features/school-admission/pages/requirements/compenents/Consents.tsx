import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import { handleStatus, statusClass } from "./TableData";
import { BASE_URL } from "../../../../../services/api/base";
import { admissionAPIs } from "../../../services/admissionAPIs";
import PickFileButton from "../../../../../components/buttons/PickFileButton";
import PrimaryBtn from "../../../../../components/buttons/PrimaryBtn";
import useAdmissions from "../../../services/useAdmissions";
import { SchoolConsentDocumentArray } from "../../../types/types";

const docUrl = BASE_URL + "/login/member/dashboard/school_app_docs/";

const ConsentsForm = ({ setOpen, data, row }: Props) => {
  const { invalidateDocs } = useAdmissions();
  const consents: SchoolConsentDocumentArray = row?.consents;
  const [filesState, setFilesState] = useState<ConsentFile[]>([]);

  const handleFiles = (school_id: string, file: File) => {
    setFilesState((prevData) => {
      const existingIndex = prevData.findIndex(
        (item) => item.school_id === school_id
      );
      if (existingIndex !== -1) {
        return prevData.map((item, index) =>
          index === existingIndex ? { ...item, file } : item
        );
      }
      // If school_id doesn't exist, add a new entry
      return [...prevData, { school_id, file }];
    });
  };

  const handleUpdate = async () => {
    if (filesState.length === 0) {
      toast.error("No files to upload.");
      throw new Error("No files to upload");
    }

    const promises = filesState.map(async (item: ConsentFile) => {
      if (!item.file || !item.school_id) {
        throw new Error(`${item.school_id || "Unknown"} not found`);
      }

      const consentItem = consents?.find((a: any) => {
        console.log(a.school.school_id, item.school_id);
        return a.school.school_id === item.school_id;
      });

      console.log(consentItem, "consentItem");
      if (!consentItem) throw new Error("School not found");

      const action = consentItem.document
        ? {
            current_doc_name: consentItem?.document.document_name,
            action: "update",
          }
        : { action: "upload" };

      const reqData = {
        ...data,
        ...action,
        comment: consentItem.school.school_id,
        consent_id: consentItem.consent.id,
        consent: item.file,
        type: consentItem.consent.consent_type,
        app_id: data.school_app_id,
        intake: data.intake_id,
        school_id: consentItem.school.school_id,
      };
      console.log(data, "props");

      const response = await admissionAPIs.uploadConsent(reqData);
      // Give feedback for each request
      if (response.code === 200) {
        toast.success(response.message);
        return response;
      } else {
        toast.error(consentItem.school.school_name + " " + response.message);
        throw new Error(response);
      }
    });
    const results = await Promise.allSettled(promises);
    return results;
  };

  const handleUpdates = useMutation({
    mutationFn: handleUpdate,
    onSuccess: (results) => {
      if (results.every((result) => result.status === "fulfilled")) {
        console.log(results.length, "results.length");
        invalidateDocs();
        setOpen(false);
        if (results.length > 1)
          toast.success("All files processed successfully!");
      }
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(`${JSON.stringify(error)}`);
    },
  });

  const handlePickFiles = (
    e: React.ChangeEvent<HTMLInputElement>,
    school_id: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleFiles(school_id, file);
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    if (filesState.length === 0) return;
    await handleUpdates.mutateAsync();
  };

  return (
    <form onSubmit={handleOnSubmit} className="col p-2 w-full">
      {consents?.map((item: any) => {
        const statusName = handleStatus(item.document?.status);
        return (
          <div key={item.school.id} className="my-2 p-1 card ">
            <p className="font-bold">{item.school.school_name}</p>
            {item.document ? (
              <div className="col my-2 gap-1 p-2">
                <p className="row gap-2">
                  <span>Status :</span>
                  <span className={statusClass(statusName)}>{statusName}.</span>
                </p>

                {item.document?.status === 3 && (
                  <div className="col">
                    <p className="font-semibold">Reason for Rejection :</p>
                    <div className="px-3">
                      <p className="first-letter:uppercase">
                        {item.document?.remarks}
                      </p>
                      {item.document?.reject_docname && (
                        <p>
                          <a
                            className="text-primary-light"
                            href={docUrl + item.document?.reject_docname}
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

                <div className="row items-center gap-2">
                  <p> Uploaded Document : </p>
                  <a
                    href={docUrl + item.document?.document_name}
                    target="_blank"
                    className="text-primary-light text-base flex-1 truncate"
                  >
                    {item.document?.document_name}
                  </a>
                </div>
                {statusName !== "Approved" && (
                  <PickFileButton
                    text="Change File"
                    onChange={(e) => handlePickFiles(e, item.school.school_id)}
                  />
                )}
              </div>
            ) : (
              <div className="col gap-3 p-2 w-full">
                {/* <p className="font-semibold opacity-60">Upload SOP</p> */}
                <PickFileButton
                  text="Upload Consent"
                  onChange={(e) => handlePickFiles(e, item.school.school_id)}
                />
              </div>
            )}
          </div>
        );
      })}
      <div className="row justify-end w-full gap-2 mt-3">
        <button className="text-btn" onClick={() => setOpen(false)}>
          Close
        </button>
        {row.uploaded_documents.filter((item: any) => item?.status !== "2")
          .length !== 0 && (
          <PrimaryBtn type="submit">
            {handleUpdates.isPending ? "Uploading..." : "Update"}
          </PrimaryBtn>
        )}
      </div>
    </form>
  );
};

export default ConsentsForm;

type ConsentFile = {
  school_id: string;
  file: File;
};

type Props = {
  setOpen: any;
  data: any;
  row: any;
};
