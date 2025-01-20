import { CustomButtonProps } from "../../../../types";

function PrimaryBorderBtn(props: CustomButtonProps) {
  return (
    <button {...props} className={` primary-border-btn ${props.btnstyles} `}>
      {props.children}
    </button>
  );
}

export default PrimaryBorderBtn;
