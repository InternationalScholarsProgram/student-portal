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

const CalendlyMockVisaInterview = ({ text, classes }: { text?: string; classes?: string }) => (
  <Calendly
    url="https://calendly.com/accounts-u9w/visa-interview"
    text={text || "Request Mock Visa Interview"}
    classes={classes || "primary-border-btn self-end"}
  />
);
export { CalendlyMockVisaInterview };
