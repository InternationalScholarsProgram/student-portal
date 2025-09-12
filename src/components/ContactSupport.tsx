import { Link } from "react-router-dom";

function ContactSupport() {
  return (
    <div className="col">
      <p>
        If you have any questions or concerns, please contact our support team.
      </p>
      <Link className="primary-btn self-end" to="/tickets/create-ticket">Contact Support</Link>
    </div>
  );
}

export default ContactSupport;
