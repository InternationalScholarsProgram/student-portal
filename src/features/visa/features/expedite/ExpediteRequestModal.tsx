import { InputsWithLabel } from "../../../../components/inputs/InputField";
import { ModalProps } from "../../../../types";
import Modal from "../../../../components/Modal";
import { FormEvent, useEffect, useState } from "react";
import { MenuItem } from "@mui/material";
import CheckBox from "../../../../components/inputs/CheckBox";
import Select from "../../../../components/inputs/Select";
import useVisa from "../../services/hooks/useVisa";
import Guide from "./Guide";
import { useNavigate } from "react-router";
import { formData2json } from "../../../../utils/utils";
import FormFooterBtns from "../../../../components/buttons/FormFooterBtns";
import { useMutation } from "@tanstack/react-query";
import visaEndpoints from "../../services/visaEndpoints";

function ExpediteRequestModal({ open, toggleModal }: ModalProps) {
  const [read, setRead] = useState(false);
  const [marked, setMarked] = useState(false);
  const { schools, user } = useVisa();
  const navigate = useNavigate();

  useEffect(() => {
    setRead(false);
    console.log(schools);
  }, [open]);

  const requestTrainingResources = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("student_name", user?.fullnames);
    formData.append("country", user?.country);
    formData.append("semester", "spring");
    const response = await expediteVisa.mutateAsync(formData);
    if (response.status === 200) {
      navigate("/visa-processing/expedite-letter", {
        state: formData2json(formData),
      });
    }
  };

  const expediteVisa = useMutation({
    mutationFn: visaEndpoints.expediteVisa,
  });

  return (
    <Modal
      open={open}
      setOpen={toggleModal}
      title="Request for Visa Expedite Letter"
    >
      <div className="modal">
        {!read ? (
          <>
            <Guide />
            <div className="mx-3">
              <CheckBox
                sx={{ margin: 10 }}
                checked={marked}
                onChange={(e) => setMarked(e.target.checked)}
                color="primary"
                title="I have read and understand the instructions"
              />
            </div>
            <div className="row justify-end gap-2 my-3">
              <button className="text-btn" onClick={toggleModal}>
                Close
              </button>
              {marked && (
                <button
                  onClick={() => setRead(true)}
                  className="primary-btn"
                  type="submit"
                >
                  Continue
                </button>
              )}
            </div>
          </>
        ) : (
          <form
            className="ease-in-out transition-all col gap-3"
            onSubmit={requestTrainingResources}
          >
            <div className="grid grid-cols-1 gap-2">
              {formInputs?.map((input) => {
                if (input?.type === "select") {
                  const { inputLabel, ...rest } = input;
                  return (
                    <div key={input?.name}>
                      <label>{inputLabel}</label>
                      <Select variant="outlined" {...rest}>
                        {schools?.map((school) => (
                          <MenuItem
                            key={school?.school_name}
                            value={school?.school_name}
                          >
                            {school?.school_name + " - " + school?.program_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  );
                }
                return <InputsWithLabel key={input?.name} {...input} />;
              })}
            </div>
            <FormFooterBtns
              onClose={toggleModal}
              btnText={expediteVisa.isPending ? "Processing..." : "Get Letter"}
            />
          </form>
        )}
      </div>
    </Modal>
  );
}

export default ExpediteRequestModal;
const formInputs = [
  {
    type: "select",
    name: "university",
    inputLabel: "Select School Name",
    required: true,
  },
  {
    type: "text",
    name: "sevis_no",
    inputLabel: "SEVIS No as per your I-20",
    placeholder: "Enter SEVIS No as per your I-20",
    required: true,
  },
  {
    type: "date",
    name: "visa_interview_date",
    inputLabel: "Current Visa Interview Date",
    required: true,
  },
  {
    type: "time",
    name: "visa_interview_time",
    inputLabel: "Current Visa Interview Time",
    required: true,
  },
  {
    type: "text",
    name: "ivr_account_number",
    inputLabel: "IVR Account No (As per your visa appointment record)",
    placeholder: "IVR123456",
    required: true,
  },
  {
    type: "date",
    name: "reporting_date",
    inputLabel: "Earliest admission date as per your I-20",
    required: true,
  },
];
