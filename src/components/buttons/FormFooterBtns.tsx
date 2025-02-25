type Props = {
  onClose: () => void;
  onSubmit?: () => void;
  btnText?: string;
};
function FormFooterBtns({ onClose, onSubmit, btnText }: Props) {
  return (
    <footer
      data-html2canvas-ignore // ignore html2canvas when generating pdf
      className="row justify-end gap-2 py-1 border-t-30"
    >
      <button onClick={onClose} className="text-btn">
        Close
      </button>
      <button
        className="primary-btn"
        {...(onSubmit ? { onClick: onSubmit } : { type: "submit" })}
      >
        {btnText ? btnText : "Submit"}
      </button>
    </footer>
  );
}

export default FormFooterBtns;
