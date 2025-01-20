import { useState } from "react";
import Swal from "sweetalert2";
import { useTheme } from "@mui/material";
import PrimaryBtn from "../../../components/buttons/PrimaryBtn";
import { Link } from "react-router-dom";
import useFetchUser from "../../../services/hooks/useFetchUser";

const SwitchOptions = () => {
  const { user } = useFetchUser();
  const [requiredPay, setRequiredPay] = useState(40);

  const { palette } = useTheme();
  const formatMoney = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const confirmSwitch = (to: string) => {
    Swal.fire({
      title: "Change Program?",
      text: `This action will change your current program option to ${to}.`,
      showCancelButton: true,
      confirmButtonColor: palette.primary.main,
      cancelButtonColor: palette.error.main,
      confirmButtonText: "Change",
      background: palette.background.paper,
      color: palette.text.primary,
    }).then((result) => {
      if (result.isConfirmed) {
        // setUser({ programOption: to });
      }
    });
  };

  return (
    <main className="content-container">
      {/* <SwitchPrograms /> */}
      <p>
        Current Program Option:{" "}
        <span className="font-semibold">{user?.programOption}</span>
      </p>
      <section className="m-4">
        {user?.programOption === "Regular" ? (
          user?.balance >= 500 ? (
            <div className="my-4 col gap-3">
              <p>
                Having enrolled as a <span>Regular</span> option student,
                {formatMoney(500)} will be deducted from your account to cover
                the
                <span> Prime option contribution. </span>
                Please note, your current total balance as of today is
                <span>{formatMoney(user?.balance)}</span>. This amount will be
                used to cover expenses like Visa fees, SEVIS fees, etc.
              </p>
              <PrimaryBtn
                btnstyles="w-fit self-end"
                onClick={() => confirmSwitch("Prime")}
              >
                Switch
              </PrimaryBtn>
            </div>
          ) : (
            <div className="my-3 col gap-3">
              <h4>Shifting to Prime</h4>
              <p className="mt-4">
                As a <span className="">Regular</span> option student, you need
                to contribute an additional{" "}
                <span>{formatMoney(requiredPay)}</span> to join the Prime
                option.
              </p>
              <p className="space-x-2">
                <Link to="/portal/make-payments" className="text-primary-light">
                  Click here
                </Link>
                <span>
                  to make the payment and select Program contribution.
                </span>
              </p>
            </div>
          )
        ) : user?.programOption === "Prime" ? (
          <div className="my-3 gap-2 w-full col">
            <h4>Shifting to Regular</h4>
            <p className="mt-4">
              Having enrolled as a <span className="font-semibold">Prime</span>{" "}
              option student, you are required to enroll in GRE or GMAT classes
              immediately after signing the contract.
            </p>
            <PrimaryBtn
              btnstyles="w-fit self-end"
              onClick={() => confirmSwitch("Regular")}
            >
              Switch
            </PrimaryBtn>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </main>
  );
};

export default SwitchOptions;
