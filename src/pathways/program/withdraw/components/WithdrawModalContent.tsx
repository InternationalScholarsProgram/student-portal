import PrimaryBtn from "../../../../components/buttons/PrimaryBtn";
import InputField from "../../../../components/inputs/InputField";
import useFetchUser from "../../../../services/hooks/useFetchUser";

function WithdrawModalContent() {
  const { user } = useFetchUser();

  return (
    <form
      className="shadow-lg w-full max-w-lg"
      action="requested.php"
      method="POST"
      id="form"
    >
      {/* Modal Body */}
      {user?.country === "kenya" ? (
        <div className="px-6 py-2">
          <div className="mb-4 p-4 rounded-lg">
            <p className="text-center opacity-60">
              Please make sure you have put the correct MPESA number to avoid
              your refund being sent to the wrong recipient. The company is not
              liable for any payout to the wrong person.
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium opacity-80">
              Full Name
            </label>
            <InputField
              fullWidth
              type="text"
              name="fullname"
              placeholder="John Doe"
              required
              helperText="Full name as it appears in Mpesa"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium opacity-80">
              Phone Number
            </label>
            <InputField
              fullWidth
              type="text"
              name="phone_no"
              placeholder="254714129876"
              required
              helperText="Use the 254 format"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium opacity-80">
              Confirm Phone Number
            </label>
            <InputField
              fullWidth
              type="text"
              name="confirm_phone_no"
              placeholder="254714129876"
              required
              helperText="Use the 254 format"
            />
          </div>
        </div>
      ) : user?.country === "Zimbabwe" ? (
        <div className="p-6">
          <div className="mb-4 p-4 rounded-lg">
            <p className="text-center opacity-80">
              Please make sure you have put the correct account number to avoid
              your refund being sent to the wrong recipient. The company is not
              liable for any payout to the wrong person.
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium opacity-80">
              Full Name
            </label>
            <InputField
              fullWidth
              type="text"
              name="fullname"
              placeholder="John Doe"
              required
              helperText="Full name as it appears in your account"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium opacity-80">
              Account Number
            </label>
            <InputField
              fullWidth
              type="text"
              name="account_no"
              placeholder="0123456789"
              required
              helperText="Use the correct format"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium opacity-80">
              Confirm Account Number
            </label>
            <InputField
              fullWidth
              type="text"
              name="confirm_account_no"
              placeholder="0123456789"
              helperText="Use the correct format"
              required
            />
          </div>
        </div>
      ) : null}

      {/* Modal Footer */}
      <div className=" p-4 row justify-end">
        <PrimaryBtn
          type="submit"
          className="px-4 py-2 font-semibold rounded-lg shadow"
        >
          Submit
        </PrimaryBtn>
      </div>
    </form>
  );
}

export default WithdrawModalContent;
