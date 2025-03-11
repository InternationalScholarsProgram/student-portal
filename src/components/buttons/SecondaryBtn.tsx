import { CustomButtonProps } from "../../types";

const SecondaryBtn: React.FC<CustomButtonProps> = ({ className, ...props }) => {
  return (
    <button {...props} className={`secondary-btn ${className ?? ""}`}>
      {props.children}
    </button>
  );
};

export default SecondaryBtn;
