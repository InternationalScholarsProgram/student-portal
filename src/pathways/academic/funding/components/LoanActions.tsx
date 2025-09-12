import ContentComponent from "../../../../components/ContentComponent";
import RadioBtns from "../../../../components/inputs/RadioBtns";
import PrimaryBtn from "../../../../components/buttons/PrimaryBtn";
import { useState } from "react";

type Props = {
  onSubmit: (action: string) => void;
  options: any[];
};

const LoanActions = ({ onSubmit, options }: Props) => {
  const [action, setAction] = useState("");
  return (
    <ContentComponent header="Loan Actions" className="my-3">
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          const formAction = e.currentTarget?.action.value;
          onSubmit(formAction);
        }}
        className="col p-2"
      >
        <RadioBtns
          name="action"
          className="px-5"
          title="What would you like to do?"
          options={options}
          onChange={(e: any) => setAction(e.target.value)}
        />
        <PrimaryBtn disabled={!action} className="self-end">
          Proceed
        </PrimaryBtn>
      </form>
    </ContentComponent>
  );
};

export default LoanActions;
