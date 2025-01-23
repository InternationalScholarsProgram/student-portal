import { MenuItem, Select } from "@mui/material";
import Modal from "../../../../components/Modal";
import { useState } from "react";
import useAdmissions from "../../components/api/useAdmissions";
import { useMutation } from "@tanstack/react-query";
import { admissionAPIs } from "../../components/api/functions";
import InputField from "../../../../components/inputs/InputField";

type Props = {
  open: boolean;
  toggleModal: () => void;
  school: any;
};
const reasons = [
  "",
  { label: "Accepted", value: 1 },
  { label: "Denied", value: 2 },
];

function SchoolFeedBackModal({ open, toggleModal, school }: Props) {
  const [formData, setFormData] = useState<any>({});
  const { user } = useAdmissions();
  
  const handleChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await handleUpdate.mutateAsync();
    console.log(res);
  };

  const handleUpdate = useMutation({
    mutationFn: async () => {
      await admissionAPIs.sendSchoolFeedback({
        applicationid: school?.application_details.id,
        response: formData?.reason,
        letter: formData?.letter,
        id_doc: formData?.id_doc,
      });
    },
  });
  return (
    <Modal
      title="Provide School Decision feedback"
      open={open}
      setOpen={toggleModal}
    >
      <div className="p-3 col gap-3 w-[80vw] md:w-[60vw] xl:w-[45vw]">
        <h3 className="underlin text-primary-light">
          {school?.school_name} - {school?.program_name}
        </h3>
        <p className="card p-2 mx-3">
          Kindly provide admission feedback only if you have received any
          decision from the school. (If you have not received a decision, kindly
          don't submit).
        </p>
        <form onSubmit={handleSubmit} className="col p-2 w-full">
          <div className="col w-2/3">
            <label>Select Response You Got</label>
            <Select
              value={formData?.reason || reasons[0]}
              onChange={(event) => handleChange("reason", event.target.value)}
              required
            >
              {reasons?.map((item: any) => (
                <MenuItem key={JSON.stringify(item)} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </div>
          {formData?.reason && (
            <>
              <div
                onClick={() => console.log(formData.reason, "reason")}
                className="col my-3 "
              >
                <label>
                  Upload
                  {formData?.reason === 1
                    ? " Offer Letter "
                    : " Denial Letter "}
                </label>
                <div className="p-2">
                  <InputField
                    type="file"
                    required
                    onChange={(e: any) =>
                      handleChange("letter", e.target.files[0])
                    }
                  />
                </div>
              </div>
              <div className="col my-3 ">
                <label>
                  {user?.country === "kenya" ? " National ID" : "Passport"}
                </label>
                <div className="p-2">
                  <InputField
                    type="file"
                    required
                    onChange={(e: any) =>
                      handleChange("id_doc", e.target.files[0])
                    }
                  />
                </div>
              </div>
            </>
          )}
          <div className="row justify-end gap-2 my-2">
            <button onClick={toggleModal} className="text-btn">
              Close
            </button>
            <button
              disabled={!formData?.reason}
              type="submit"
              className="primary-btn"
            >
              {handleUpdate.isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default SchoolFeedBackModal;
