import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import { handleStatus, statusClass } from "./TableData";
import { BASE_URL } from "../../../../services/api/base";
import { admissionAPIs } from "../../components/api/functions";
import PickFileButton from "../../../../components/buttons/PickFileButton";
import PrimaryBtn from "../../../../components/buttons/PrimaryBtn";

const docUrl = BASE_URL + "/login/member/dashboard/school_app_docs/";

const SOP = ({ schools, setOpen, data, row, inValidate }: Props) => {
  const [filesState, setFilesState] = useState<SchoolFile[]>([]);

  const handleFiles = (id: string, file: File) => {
    setFilesState((prevData) => {
      const findIndex = prevData.findIndex(
        (school: any) => school.proposed_course_id === id
      );

      if (findIndex !== -1) {
        // If id exists, update the file only
        const updatedData = [...prevData];
        updatedData[findIndex] = {
          ...updatedData[findIndex],
          file: file,
        };
        return updatedData;
      }

      return [
        ...prevData,
        {
          proposed_course_id: id,
          file: file,
        },
      ];
    });
  };

  const handleUpdate = async () => {
    if (filesState.length === 0) {
      toast.error("No files to upload.");
      throw new Error("No files to upload");
    }

    const responses = filesState.map(async (item: SchoolFile) => {
      if (!item.file || !item.proposed_course_id) {
        throw new Error(`${item.proposed_course_id || "Unknown"} not found`);
      }

      const schoolItem = schools.find(
        (school: any) => school.id === item.proposed_course_id
      );

      console.log(schoolItem, "schoolItem");
      if (!schoolItem) throw new Error("School not found");

      const action = schoolItem?.SOP
        ? { current_doc_name: schoolItem?.SOP, action: "update" }
        : { action: "upload" };

      const reqData = {
        ...data,
        ...action,
        ...item,
      };
      console.log(reqData, "reqData");
      const response = await admissionAPIs.uploadFile(reqData);
      if (response.code === 200) {
        toast.success(schoolItem.school_name + " SOP uploaded!");
        return response;
      } else {
        toast.error(schoolItem.school_name + " " + response.message);
        throw new Error(response);
      }
    });
    const results = await Promise.allSettled(responses);
    return results;
  };

  const handleUpdates = useMutation({
    mutationFn: handleUpdate,
    onSuccess: (results) => {
      if (results.every((result) => result.status === "fulfilled")) {
        console.log(results.length, "results.length");
        inValidate();
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
    id: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleFiles(id, file);
  };

  const attachDoc = (id: string) =>
    row?.uploaded_documents?.find((doc: any) => doc?.course?.id === id);

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    if (filesState.length === 0) return;
    await handleUpdates.mutateAsync();
  };

  return (
    <form onSubmit={handleOnSubmit} className="col p-2 w-full">
      {schools?.map((school: any) => {
        const isDocument = attachDoc(school.id);
        const statusName = handleStatus(isDocument?.status);
        return (
          <div key={school.id} className="my-2 p-1 card ">
            <p className="font-bold">{school.school_name}</p>
            {isDocument ? (
              <div className="col my-2 gap-1 p-2">
                <p className="row gap-2">
                  <span>Status :</span>
                  <span className={statusClass(statusName)}>{statusName}.</span>
                </p>

                {isDocument?.status === 3 && (
                  <div className="col">
                    <p className="font-semibold">Reason for Rejection :</p>
                    <div className="px-3">
                    <p className="first-letter:uppercase">
                      {isDocument?.remarks}
                    </p>
                    {isDocument?.reject_docname && (
                      <p>
                        <a
                          className="text-primary-light"
                          href={docUrl + isDocument?.reject_docname}
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
                    href={docUrl + isDocument?.document_name}
                    target="_blank"
                    className="text-primary-light text-base flex-1 truncate"
                  >
                    {isDocument?.document_name}
                  </a>
                </div>
                {statusName !== "Approved" && (
                  <PickFileButton
                    text="Change File"
                    onChange={(e) => handlePickFiles(e, school.id)}
                  />
                )}
              </div>
            ) : (
              <div className="col gap-3 p-2 w-full">
                {/* <p className="font-semibold opacity-60">Upload SOP</p> */}
                <PickFileButton
                  text="Upload SOP"
                  onChange={(e) => handlePickFiles(e, school.id)}
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
        {schools.filter((item: any) => item?.SOP_status !== "2").length !==
          0 && (
          <PrimaryBtn type="submit">
            {handleUpdates.isPending ? "Uploading..." : "Update"}
          </PrimaryBtn>
        )}
      </div>
    </form>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default SOP;

type SchoolFile = {
  proposed_course_id: string;
  file: File;
};

type Props = {
  schools: any[];
  setOpen: any;
  data: any;
  row: any;
  inValidate: any;
};
