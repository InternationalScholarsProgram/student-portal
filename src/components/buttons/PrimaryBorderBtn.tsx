function PrimaryBorderBtn(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className={`${props.disabled && "disabled-btn"} primary-border-btn ${
        props.className ?? ""
      }`}
    >
      {props.children}
    </button>
  );
}

export default PrimaryBorderBtn;
