import { Link } from "react-router-dom";
import { FullLoader } from "../../../../../../components/loaders/Loader";
import { useQuery } from "@tanstack/react-query";
import useAdmissions from "../../../services/useAdmissions";
import contractService from "../../../../../user/contracts/services/apis";

function CheckApplicationContract() {
  const { user } = useAdmissions();
  const { data, isLoading } = useQuery({
    queryKey: [user?.email, "check contract status"],
    queryFn: contractService.checkSchoolApplication,
  });

  if (isLoading) return <FullLoader />;

  if (data)
    return (
      <main>
        <h3 className="title-sm my-2">
          School Application Consent/Agreement Contract
        </h3>
        <section className="card col p-3 gap-3">
          <p>
            Dear <strong>{user?.fullnames}</strong>,
          </p>
          <p>
            We are pleased to inform you that you are now at an important stage
            in your admission process. Before we proceed with submitting your
            school application, you are required to review and sign the
            <strong>
              {" "}
              School Application Consent/Agreement Contract.
            </strong>{" "}
            This document outlines the terms and conditions related to your
            application, including your responsibilities, expectations, and data
            protection policies.
          </p>
          <p>
            By signing this agreement, you will confirm that you understand and
            agree to the admission policies, financial obligations, and any
            other applicable terms stated in the contract. This is a mandatory
            step to ensure a smooth processing of your application.
          </p>
          <p>
            Please take a moment to carefully read through the contract. If you
            have any questions, feel free to reach out to our support team
            before proceeding.
          </p>
          <div className="row justify-end">
            <Link
              className="primary-border-btn"
              to={`${data.URL}?id=${user?.email}&consent_id=${data.id}`}
              target="_blank"
            >
              Review & Sign Contract
            </Link>
          </div>
        </section>
      </main>
    );
}

export default CheckApplicationContract;
