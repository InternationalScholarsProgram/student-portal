function Guide() {
  return (
    <div className="col gap-2">
      {/* <h3 className="title-sm underline">Instruction</h3> */}
      <p>
        Upon downloading the visa appointment expedite request letter, sign in
        to your visa appointment account at
        <a
          className="text-primary-light px-1"
          href="https://ais.usvisa-info.com/en-ke/niv"
        >
          https://ais.usvisa-info.com/en-ke/niv
        </a>
        , and click <strong>Request Expedite</strong>. Pick the{" "}
        <strong>Facility</strong> and provide the 'Requested Appointment Time'
        and then under the 'Reason for Request', copy and paste the content of
        the expedite letter you downloaded from this portal and submit the
        request. Wait for a response within 48 hours.
      </p>
      <p>
        If the expedite request is declined through your visa appointment
        account, send an email to
        <a
          className="text-primary-light px-1"
          // href={`mailto:${visaInstructions[user?.country].email}`}
        >
          visitorvisanairobi@state.gov
        </a>
        using your personal email that you used in the DS160 application. In the
        email, request the embassy to expedite your appointment and attach the
        visa appointment expedite request letter you downloaded from this
        portal. (
        <span className="text-dark-warning-main">
          DO NOT use your program email to communicate with the embassy
        </span>
        )
      </p>
      <p>
        If both options are denied, continue checking for any viable available
        date through your visa appointment account.
      </p>
    </div>
  );
}

export default Guide;
const visaInstructions = {
  kenya: {
    link: "https://ais.usvisa-info.com/en-ke/niv",
    email: "visitorvisanairobi@state.gov",
  },
  zimbabwe: {
    link: "https://evisaforms.state.gov/Instructions/SchedulingSystem.asp",
    email: "visitorvisazimbabwe@state.gov",
  },
};