import useFetchUser from "../services/hooks/useFetchUser";
import { PopupButton } from "react-calendly";
type Props = {
  text: string;
  classes?: string;
  url: string;
};
const Calendly = ({ text, classes, url }: Props) => {
  const { user } = useFetchUser();
  return (
    <>
      <PopupButton
        url={url}
        text={text}
        className={classes || "primary-btn"}
        rootElement={document.getElementById("root")!}
        prefill={{
          name: user?.fullnames || "",
          email: user?.email || "",
        }}
      />
    </>
  );
};
export default Calendly;
type MockProps = {
  text?: string;
  classes?: string;
  url?: string;
};
const CalendlyMockVisaInterview = ({ url, text, classes }: MockProps) => (
  <Calendly
    url={url || "https://calendly.com/accounts-u9w/visa-interview"}
    text={text || "Request Mock Visa Interview"}
    classes={classes || "primary-border-btn self-end"}
  />
);
const CalendlyFundingAdvisory = ({ url, text, classes }: MockProps) => (
  <Calendly
    url={url || "https://calendly.com/ruth-munene/funding-advisory?hide_gdpr_banner=1"}
    text={text || "Book Funding Advisory"}
    classes={classes || "primary-btn self-end"}
  />
);

export { CalendlyMockVisaInterview,CalendlyFundingAdvisory };
