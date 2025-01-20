import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAccountStatement from "../../../services/hooks/useAccountStatement";
import Loader from "../../../components/loaders/Loader";
import api from "../../../services/api/base";
import { Link } from "react-router-dom";

const SwitchPrograms = () => {
  const [requiredPay, setRequiredPay] = useState(0);
  const { user, accountStatements }: any = useAccountStatement();
  const totalPayment = accountStatements?.total_payment;
  const totalExpenditure = accountStatements?.total_expenditure;
  const calculatedBalance = accountStatements?.balance;

  const getRequredPay = () => {
    let calculatedRequiredPay = 0;
    if (totalPayment === 620) {
      calculatedRequiredPay = 1000;
    } else if (totalPayment === 1120) {
      calculatedRequiredPay =
        totalExpenditure > 620 ? totalExpenditure - 620 + 500 : 500;
    } else if (totalPayment > 1620 && calculatedBalance < 500) {
      calculatedRequiredPay = 500 - calculatedBalance;
    } else if (totalPayment > 1120 && totalPayment < 1620) {
      calculatedRequiredPay = 1000 - calculatedBalance;
    }
    setRequiredPay(calculatedRequiredPay);
  };

  const switchProgram = async () => {
    try {
      const response = await api.get(
        `/login/member/dashboard/shift_save.php?id=${user?.email}`
      );
      if (response.status === 200) {
        // window.location.reload();
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequredPay();
  }, []);

  const formatMoney = (amount: number) => `$${amount.toFixed(2)}`;

  const confirmSwitch = () => {
    Swal.fire({
      title: "Do you wish to convert?",
      text: "This action will change your current program option.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continue",
    }).then((result) => {
      if (result.isConfirmed) switchProgram();
    });
  };

  if (!user || !accountStatements) return <Loader />;

  return (
    <div className="container mx-auto px-6 py-8 font-sans">
      <h1 className="text-3xl font-bold mb-6">Switch Programs</h1>
      <div className="p-6 rounded-lg shadow-lg">
        {user?.package === "Regular" ? (
          calculatedBalance >= 500 ? (
            <p>
              Having enrolled as a <b>Regular</b> option student,{" "}
              {formatMoney(500)} will be deducted from your account to cover the{" "}
              <b>Prime option contribution.</b>
              Your current balance is <b>
                {formatMoney(calculatedBalance)}
              </b>. <br />
              <br />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={confirmSwitch}
              >
                Accept
              </button>
            </p>
          ) : (
            <p>
              Shifting to <b>Prime</b>: You need to contribute an additional{" "}
              <b>{formatMoney(requiredPay)}</b> to join the Prime option.
              <br />
              <Link to="/portal/make-payments" className="text-blue-500 underline">
                Click here to make a payment
              </Link>
            </p>
          )
        ) : (
          <p>
            Shifting to <b>Regular</b>: As a Prime option student, you are
            required to enroll in GRE or GMAT classes after signing the
            contract.
            <br />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={confirmSwitch}
            >
              Accept
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default SwitchPrograms;
