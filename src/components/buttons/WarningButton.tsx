import { CustomButtonProps } from "../../../../types";

function WarningButton(props: CustomButtonProps) {
    return (
      <button {...props} className={`warning-btn ${props.btnstyles}`}>
        {props.children}
      </button>
    );
  }
export default WarningButton

