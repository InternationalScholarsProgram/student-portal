import CosignerForm from "./CosignerForm";
import { CosignerStatus } from "./CosignerStatus";
import SallieApplicationForm from "./SallieApplicationForm";

function SallieMae() {
  const hasCosigner = Math.floor(Math.random() * 2) > 9;
  return (
    <div>
      {/* <b className="text-primary-light">Sallie Mae Loan Application</b> */}
      {hasCosigner ? <CosignerForm /> : <CosignerStatus status={4} />}
    </div>
  );
}

export default SallieMae;
