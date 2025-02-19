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

function ExpediteRequestModal({ open, toggleModal }: ModalProps) {
  const [read, setRead] = useState(false);
  const [marked, setMarked] = useState(false);
  const { schools } = useVisa();
  const navigate = useNavigate();

  useEffect(() => {
    setRead(false);
    console.log(schools);
  }, [open]);

  const requestTrainingResources = (e: FormEvent) => {
    e.preventDefault();
    navigate("/visa-processing/expedite-letter", {
      state: formData2json(new FormData(e.target as HTMLFormElement)),
    });
  };
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
            className="ease-in-out transition-all"
            onSubmit={requestTrainingResources}
          >
            <div className="col p-4 gap-3">
              <div className="grid grid-cols-1 gap-2">
                {formInputs?.map((input) => {
                  if (input?.type === "select") {
                    return (
                      <Select
                        key={input?.name}
                        placeholder={input?.inputLabel}
                        {...input}
                      >
                        {schools?.map((school: any) => (
                          <MenuItem
                            key={school?.school_name}
                            value={school?.school_name || ""}
                          >
                            {school?.school_name + " - " + school?.program_name}
                          </MenuItem>
                        ))}
                      </Select>
                    );
                  }
                  return <InputsWithLabel key={input?.name} {...input} />;
                })}
              </div>
            </div>
            <div className="row justify-end gap-2 my-3">
              <button className="text-btn" onClick={toggleModal}>
                Close
              </button>
              <button className="primary-btn" type="submit">
                Get Letter
              </button>
            </div>
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
    inputLabel: "University Attending",
    placeholder: "Select or Enter School Name",
    required: true,
  },
  {
    type: "text",
    name: "servis",
    inputLabel: "SEVIS No as per your I-20",
    placeholder: "Enter SEVIS No as per your I-20",
    required: true,
  },
  {
    type: "date",
    name: "visa_date",
    inputLabel: "Current Visa Interview Date",
    required: true,
  },
  {
    type: "time",
    name: "visa_time",
    inputLabel: "Current Visa Interview Time",
    required: true,
  },
  {
    type: "text",
    name: "ivr",
    inputLabel: "IVR Account No (As per your visa appointment record)",
    placeholder: "IVR123456",
    required: true,
  },
  {
    type: "date",
    name: "admission_date",
    inputLabel: "Earliest admission date as per your I-20",
    required: true,
  },
];
