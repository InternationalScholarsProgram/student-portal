import React from "react";
import { MenuItem } from "@mui/material";
import { InputsWithLabel } from "../../../../../../components/inputs/InputField";
import Select from "../../../../../../components/inputs/Select";
import useRelocation from "../../services/useRelocation";
import ContentComponent from "../../../../../../components/ContentComponent";
import OfferLetter from "./OfferLetter";
import FormFooterBtns from "../../../../../../components/buttons/FormFooterBtns";
import { useMutation } from "@tanstack/react-query";
import relocationApis from "../../services/relocationApis";
import { toast } from "react-toastify";

const Decision = () => {
  const [response, setResponse] = React.useState<any>("");
  const { relocationStatus, invalidate } = useRelocation();
  const decision = useMutation({
    mutationFn: relocationApis.decision,
    onSuccess: () => {
      toast.success("Decision submitted successfully.");
      invalidate("status");
    },
  });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    decision.mutate(formData);
  };

  return (
    <>
      <ContentComponent header="Loan Decision">
        <p>
          Congratulations, you have been awarded a loan of USD{" "}
          {relocationStatus?.loan?.principal}. This loan will be used to cover
          your relocation expenses and will be disbursed to your US bank
          account. Download the offer letter below, and either choose to accept
          or reject the loan offer to continue with the next steps.
        </p>
        <OfferLetter loan={relocationStatus?.loan?.principal} />
      </ContentComponent>
      <ContentComponent header="Loan Offer Decision ">
        <form onSubmit={onSubmit}>
          <Select
            placeholder="Please read the offer letter carefully before giving a response"
            onChange={(e) => setResponse(e.target.value)}
          >
            {["Accept", "Reject"].map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          {response === "Reject" && (
            <InputsWithLabel
              inputLabel="You are choosing to reject our loan offer. We would like to understand this decision, please provide a reason for the rejection below."
              name="reason_for_rejection"
              placeholder="Reason for rejection"
            />
          )}
          {response !== "" && <FormFooterBtns btnText={"Submit"} />}
        </form>
      </ContentComponent>
    </>
  );
};

export default Decision;
