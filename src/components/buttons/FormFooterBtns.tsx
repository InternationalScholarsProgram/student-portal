type Props = {
  onClose: () => void;
  onSubmit?: () => void;
  btnText?: string;
  hideBtn?: boolean;
};
function FormFooterBtns({ onClose, onSubmit, btnText, hideBtn }: Props) {
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
          className="primary-btn"
          {...(onSubmit ? { onClick: onSubmit } : { type: "submit" })}
        >
          {btnText ? btnText : "Submit"}
        </button>
      )}
    </footer>
  );
}

export default FormFooterBtns;
