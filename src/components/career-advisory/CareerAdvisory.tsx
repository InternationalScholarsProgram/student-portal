import { PopupButton } from "react-calendly";
import useFetchUser from "../../services/hooks/useFetchUser";

type Props = {
  text: string;
  classes?: string;
  url?: string;
};

const CareerAdvisory = ({ text, classes, url }: Props) => {
  const { user } = useFetchUser();
  return (
    <div>
      <PopupButton
        url={
          url || "https://calendly.com/martin-mugambi/career-advisory-meeting"
        }
        text={text}
        className={classes || "primary-btn"}
        rootElement={document.getElementById("root")!}
        prefill={{
          name: user?.fullnames || "",
          email: user?.email || "",
        }}
      />
    </div>
  );
};

export default CareerAdvisory;
