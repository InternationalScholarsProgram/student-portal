import { CustomButtonProps } from "../../types";

const PrimaryBtn: React.FC<CustomButtonProps> = ({
  className,
  children,
  ...props
}) => (
  <button
    {...props}
    className={`${props.disabled && "disabled-btn"} primary-btn ${
      className ?? ""
    }`}
  >
    {children}
  </button>
);
export default PrimaryBtn;
