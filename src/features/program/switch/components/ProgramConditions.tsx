import { Link } from "react-router-dom";
import { formatCurrency } from "../../../../utils/utils";
import { useState } from "react";
import Modal from "../../../../components/Modal";
import useSwitchProgram from "../hook/useSwitchProgram";
import ContentComponent from "../../../../components/ContentComponent";
import FormFooterBtns from "../../../../components/buttons/FormFooterBtns";

const ProgramConditions = () => {
  const { handleSwitch, requiredPay, balance, programOption } =
    useSwitchProgram();

  switch (programOption) {
    case "regular":
      return (
        <Regular
          requiredPay={requiredPay}
          handleSwitch={handleSwitch}
          balance={balance}
        />
      );
    case "prime":
      return (
        <ContentComponent header="Switching to Regular">
          <p>
            As a prime option student, you are required to submit a ticket to
            request a switch from Prime to Regular. Please ensure you provide
            all necessary details to facilitate the process.
          </p>
          <Link
            to="/create-ticket"
            state={{
              reason: "Switch Program contribution",
            }}
            className="primary-btn self-end"
          >
            Create Ticket
          </Link>
        </ContentComponent>
      );
  }
};

export default ProgramConditions;

const Regular = ({ requiredPay, handleSwitch, balance }: any) => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);

  const confirmSwitch = async () => {
    const data = await handleSwitch.mutateAsync("prime");
    if (data.code === 200) toggleModal();
  };

  if (requiredPay <= 0) {
    return (
      <ContentComponent header="Switching to prime">
        <p>
          Having enrolled as a <b>Regular</b> option student, $500.00 will be
          deducted from your account to cover the{" "}
          <b>Prime option contribution.</b> Please note, your current total
          balance as of today is <b>{formatCurrency(balance)}</b>. This amount
          will be used to take care of some of the expenses that you will later
          incur throughout this whole process such as Visa fees, SEVIS fees,
          among others.
        </p>
        <button className="primary-btn self-end" onClick={toggleModal}>
          {handleSwitch.isPending ? "Loading..." : "Accept & Continue"}
        </button>
        <Modal open={open} setOpen={toggleModal} title="Switching to prime">
          <div className="modal">
            <p>This action will change your current program option to prime.</p>
            <p className="font-semibold py-2">
              Are you sure you want to continue?
            </p>
            <FormFooterBtns
              onClose={toggleModal}
              onSubmit={confirmSwitch}
              btnText={handleSwitch.isPending ? "Switching..." : "Continue"}
              disabled={handleSwitch.isPending}
            />
          </div>
        </Modal>
      </ContentComponent>
    );
  } else {
    return (
      <ContentComponent header="Switching to prime">
        <p>
          You are currently enrolled as a regular option student. To switch to
          the <b>Prime</b> option, you are required to contribute an additional{" "}
          <b className="px-1">{formatCurrency(requiredPay)}</b>.
        </p>
        <p>
          To proceed, please make a payment and select{" "}
          <b>Program Contribution</b> as the reason and enter{" "}
          {formatCurrency(requiredPay)} as the amount.
        </p>
        <Link
          to="/make-payments"
          state={{
            requiredPay: requiredPay,
            program: "Prime",
            reason: "Program contribution",
          }}
          className="primary-btn self-end"
        >
          Make Payment
        </Link>
      </ContentComponent>
    );
  }
};
