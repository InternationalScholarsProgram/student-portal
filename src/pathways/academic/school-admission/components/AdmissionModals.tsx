import SelectDropDown from "../../../../components/inputs/SelectDropDown";
import PrimaryBorderBtn from "../../../../components/buttons/PrimaryBorderBtn";
import PrimaryBtn from "../../../../components/buttons/PrimaryBtn";
import CareerAdvisory from "../../../../components/career-advisory/CareerAdvisory";
import Modal from "../../../../components/Modal";
import InputField from "../../../../components/inputs/InputField";

interface Props {
  open: boolean;
  toggleModal: () => void;
}

export function AdmissionModals({ open, toggleModal }: Props) {
  return (
    <Modal
      title="Provide School Decision feedback"
      open={open}
      setOpen={toggleModal}
    >
      <div className="p-3 w-[80vw] md:w-[60vw] xl:w-[45vw] col gap-2">
        <p>
          School: <span id="schl_feed"></span>
          <br />
          Program: <span id="prog_feed"></span>
        </p>
        <div className="card border border-primary-main">
          <p className="text-center mt-2 p-2">
            Note: Kindly provide admission feedback only if you have received
            any decision from the school. (If you have not received a decision,
            kindly don't submit).
          </p>
        </div>
        <form
          className="col gap-4 p-5 my-2"
          action="school_app_feedback.php"
          method="POST"
          encType="multipart/form-data"
        >
          <div className="col">
            <label>Select Response You Got</label>
            <SelectDropDown
              options={[
                { label: "Accepted", value: "1" },
                { label: "Denied", value: "2" },
              ]}
              display={(option) => <p className="px-2 py-1">{option.label}</p>}
              onChange={(value) => console.log(value)}
              placeholder="Select feedback"
              name="response"
            />
          </div>
          <div className="col">
            <label>Email</label>
            <InputField name="application_email" />
          </div>
          <div className="col">
            <label>Application Id</label>
            <InputField name="applicationid" className="" />
          </div>
          <div className="col">
            <label> Admission Decision Letter</label>
            <InputField type="file" name="letter" required />
          </div>
          <div className="col">
            <label>
              Your national ID card (<b>needed to process funding</b>)
            </label>
            <InputField type="file" name="id_doc" required />
          </div>
          <div className="row justify-end gap-2">
            <PrimaryBorderBtn onClick={toggleModal}>Cancel</PrimaryBorderBtn>
            <PrimaryBtn type="submit" className="btn btn-primary">
              Submit Feedback
            </PrimaryBtn>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export function SOP({ open, toggleModal }: Props) {
  return (
    <Modal title="Please Note" open={open} setOpen={toggleModal}>
      <div className="p-3 w-[80vw] md:w-[60vw] xl:w-[45vw]">
        <div className="card col p-2">
          <p className="">
            If you wish to apply to another course or school please make sure
            that the course and school is not part of the proposed course on
            list of SOP you are requested for. if its kindly proceed to submit
            SOP. After your SOP has been approved kindly submit the school app
            request
          </p>
          <div className="self-end">
            <a
              href="docs_upload_checklist.php?id=3&type=1&item_name=statements of purpose"
              className="my-3 primary-border-btn"
            >
              Proceed to submit SOP
            </a>
          </div>
        </div>
        <div className="P-2">
          <p className="mt-2 px-2">
            If the school and course is not part of proposed course kindly
            request career advisory meeting.
          </p>

          <form method="POST" action="" className="col gap-1 p-2">
            <div className="self-end">
              <CareerAdvisory text="Request Career Advisory" />
            </div>

            <input type="hidden" name="confirmation" value="" />
            {/* <script>
            document.querySelector('button[name="rebook"]').addEventListener('click', function () {
                var confirmed = confirm('Are you sure?');
                document.querySelector('input[name="confirmation"]').value = confirmed ? 'yes' : '';
            });
            </script> */}
          </form>
        </div>
      </div>
    </Modal>
  );
}