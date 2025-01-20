import { CustomButtonProps } from "../../../../types";

function SecondaryBtn(props: CustomButtonProps) {
  return (
    <button {...props} className={`secondary-btn ${props.btnstyles}`}>
      {props.children}
    </button>
  );
}

export default SecondaryBtn;
