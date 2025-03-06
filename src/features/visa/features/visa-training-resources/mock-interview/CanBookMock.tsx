import { CalendlyMockVisaInterview } from "../../../../../components/Calendly";
import BookedMockStatus from "./BookedMockStatus";

function CanBookMock({ hasBooked }: { hasBooked: boolean }) {
  return (
    <div>
      {hasBooked ? (
        <BookedMockStatus />
      ) : (
        <div className="col gap-2 p-3 card">
          <p>
            Your visa interview is approaching soon, and we want to help you
            prepare with confidence. Booking a mock interview can help you
            practice answering questions, reduce anxiety, and increase your
            chances of success. Secure your session now to get personalized
            feedback and guidance.
          </p>
          <CalendlyMockVisaInterview text="Book Mock Visa Interview" />
        </div>
      )}
    </div>
  );
}

export default CanBookMock;
