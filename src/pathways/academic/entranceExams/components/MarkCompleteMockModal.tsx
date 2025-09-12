import React, { useEffect } from "react";
import Modal from "../../../../components/Modal";
import { InputsWithLabel } from "../../../../components/inputs/InputField";
import FormFooterBtns from "../../../../components/buttons/FormFooterBtns";
import { useMutation } from "@tanstack/react-query";
import examsEndpoints from "../services/examsEndpoints";
import { toast } from "react-toastify";
import { errorMsg } from "../../../../components/errors/errorMsg";
import { Resources } from "../types/examTypes";
import RadioBtns from "../../../../components/inputs/RadioBtns";
import { yesNoOptions } from "../../../../utils/constants";
import { Link } from "react-router-dom";
import StatusChip from "../../../../components/StatusChip";
import { ModalProps } from "../../../../types";

type Props = ModalProps & {
  mock: (Resources & { enrollment_id: number | undefined }) | undefined;
  invalidateStatus: () => void;
  mockResults: any;
};

const MarkCompleteMockModal: React.FC<Props> = ({
  open,
  toggleModal,
  invalidateStatus,
  mock,
  mockResults,
}) => {
  const [doneMock, setDoneMock] = React.useState(false);
  const [score, setScore] = React.useState("");
  const [file, setFile] = React.useState<File | any>();

  useEffect(() => {
    setDoneMock(false);
    setScore("");
    setFile(undefined);
  }, [open]);

  const markComplete = useMutation({
    mutationFn: examsEndpoints.markMockComplete,
    onSuccess: () => {
      toast.success("Mock marked complete successfully.");
      invalidateStatus();
      toggleModal();
    },
    onError: (error) => toast.error(errorMsg(error)),
  });

  if (!mock) return;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    markComplete.mutate({
      score: score,
      mock_result: file,
      enrollment_id: mock.enrollment_id,
      mock_id: mock.id,
      section: mock.week,
    });
  };

  return (
    <>
      <Modal open={open} setOpen={toggleModal} title="Mock Modal">
        <form className="modal" onSubmit={onSubmit}>
          <b>{mock.title}</b>
          <em className="text-sm">{mock.description}</em>
          {mockResults?.marks ? (
            <div className="py-2">
              <b>Mock Results</b>
              <p>
                Your mock score is : <b className="text-primary-main">{mockResults?.marks}</b>
              </p>

              {mockResults?.status === 1 ? (
                <p>
                  Please be patient while we{" "}
                  <StatusChip type="pending" label="review your mock result" />
                </p>
              ) : (
                <>
                  {mockResults?.status === 2 ? (
                    <p>
                      Your mock result has been{" "}
                      <StatusChip type="approved" label="approved" />
                    </p>
                  ) : (
                    <p>
                      Your mock result has been evaluated and{" "}
                      <StatusChip
                        type="rejected"
                        label="deemed unsatisfactory"
                      />
                    </p>
                  )}

                  {mockResults?.comment && (
                    <p className="p-2">
                      <b>Comment</b> :<em> {mockResults?.comment}</em>{" "}
                    </p>
                  )}
                </>
              )}
            </div>
          ) : (
            <>
              <p className="text-sm pt-2">
                <Link
                  className="text-primary-light underline"
                  to={mock.link}
                  target=""
                >
                  Click Here
                </Link>{" "}
                to view the mock
              </p>
              <div className="col py-3">
                <b className="py-2">Mock Feedack</b>
                <RadioBtns
                  title="Have you completed this mock?"
                  options={yesNoOptions}
                  onChange={(e) => setDoneMock(e.target.value === "yes")}
                  row
                  className="px-3"
                />

                {doneMock && (
                  <div className="col gap-2 px-3">
                    <InputsWithLabel
                      inputLabel="Enter your mock score"
                      type="text"
                      name="score"
                      required
                      onChange={(e) => setScore(e.target.value || "")}
                    />
                    <InputsWithLabel
                      inputLabel="Upload your mock result"
                      type="file"
                      name="mock_result"
                      required
                      onChange={(e: any) => setFile(e.target.files?.[0])}
                    />
                  </div>
                )}
              </div>
            </>
          )}
          <FormFooterBtns
            onClose={toggleModal}
            btnText={markComplete.isPending ? "Loading..." : "Mark Complete"}
            hideBtn={!doneMock}
          />
        </form>
      </Modal>
    </>
  );
};

export default MarkCompleteMockModal;
