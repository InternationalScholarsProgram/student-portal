import ContentComponent from "../../../../components/ContentComponent";
import PrimaryBtn from "../../../../components/buttons/PrimaryBtn";
import { Link } from "react-router-dom";

function GotVisa() {
  return (
    <ContentComponent header="Your feedback has been successfully processed.">
      <p>
        Your visa has been <strong>approved</strong>, and we are thrilled for
        you! 🌍✈️
      </p>
      <p>
        Now that your visa is in order, it’s time to plan your journey. Please
        proceed to the <strong>Travel & Logistics</strong> module to book your
        flight and finalize your travel arrangements.
      </p>
      <PrimaryBtn className="self-end">
        <Link to="/flights">✈️ Find a Flight</Link>
      </PrimaryBtn>
    </ContentComponent>
  );
}

export default GotVisa;
