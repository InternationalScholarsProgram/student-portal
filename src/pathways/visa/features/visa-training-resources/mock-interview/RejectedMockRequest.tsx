import { CalendlyMockVisaInterview } from "../../../../../components/Calendly";

function RejectedMockRequest() {
  return (
    <div className="card alert alert-danger mt-2">
      <div className="card-header">
        <h4>Sorry, your mock visa interview request was rejected </h4>
      </div>

      <div className="card-body">
        <p>
          You were denied a mock visa interview session because of the reason
          below. Kindly work on it and try to resubmit the request.
          <strong>
            <em>Reviewer's comment : $rejection</em>
          </strong>
        </p>

        <CalendlyMockVisaInterview />
      </div>
    </div>
  );
}

export default RejectedMockRequest;
