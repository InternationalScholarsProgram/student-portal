import { CustomButtonProps } from "../../types";

function PrimaryBtn(props: CustomButtonProps) {
  return (
    <button {...props} className={` primary-btn ${props.btnstyles}`}>
      {props.children}
    </button>
  );
}

export default PrimaryBtn;
