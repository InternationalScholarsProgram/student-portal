import React from "react";
import ContentComponent from "../../../../components/ContentComponent";
import { TestTypes } from "../types/examTypes";
import PrimaryBtn from "../../../../components/buttons/PrimaryBtn";
import Modal from "../../../../components/Modal";
import FormFooterBtns from "../../../../components/buttons/FormFooterBtns";
import { useMutation } from "@tanstack/react-query";
import examsEndpoints from "../services/examsEndpoints";
import { toast } from "react-toastify";
import { InputsWithLabel } from "../../../../components/inputs/InputField";
import PasswordStrengthBar from "react-password-strength-bar";

type Props = {
  type: TestTypes;
  invalidate: () => void;
};

const RequestEnrollment: React.FC<Props> = ({ type, invalidate }) => {
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const toggleOpen = () => setOpen(!open);

  const onsubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    request.mutate({
      test_type: type,
      account_password: formData.get("account_password") as string,
      account_username: formData.get("account_username") as string,
    });
  };

  const request = useMutation({
    mutationFn: examsEndpoints.enroll,
    onSuccess: () => {
      toast.success("Enrollment successfully requested.");
      toggleOpen();
      invalidate();
    },
  });
  return (
    <>
      <PrimaryBtn onClick={toggleOpen} className="self-end">
        Request Enrollment
      </PrimaryBtn>
      <Modal open={open} setOpen={toggleOpen} title="Request Enrollment">
        <div className="modal">
          <p className="pb-3">Enter your exam account credentials.</p>

          <form onSubmit={onsubmit} className="px-3">
            <InputsWithLabel
              inputLabel="Account Username"
              name="account_username"
              type="text"
              placeholder="Enter Account Username"
            />
            <InputsWithLabel
              inputLabel="Account Password"
              name="account_password"
              type="password"
              placeholder="Enter Account Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <PasswordStrengthBar password={password} />
            <FormFooterBtns
              onClose={toggleOpen}
              btnText={
                request.isPending ? "Requesting..." : "Request Enrollment"
              }
            />
          </form>
        </div>
      </Modal>
    </>
  );
};

export default RequestEnrollment;
