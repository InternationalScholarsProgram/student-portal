interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClose: () => void;
  onSubmit?: () => void;
  btnText?: string;
  hideBtn?: boolean;
}
const FormFooterBtns = ({
  onClose,
  onSubmit,
  btnText,
  hideBtn,
  ...props
}: Props) => {
  console.log(props, "props");
  return (
    <footer
      data-html2canvas-ignore // ignore html2canvas when generating pdf
      className="row justify-end gap-2 py-1 "
    >
      <button onClick={onClose} className="text-btn">
        Close
      </button>
      {!hideBtn && (
        <button
          {...props}
          className={`primary-btn ${props.disabled && "disabled-btn"}`}
          {...(onSubmit ? { onClick: onSubmit } : { type: "submit" })}
        >
          {btnText ? btnText : "Submit"}
        </button>
      )}
    </footer>
  );
};

export default FormFooterBtns;
