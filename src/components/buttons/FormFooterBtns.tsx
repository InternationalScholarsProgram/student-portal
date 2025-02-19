type Props = {
  onClose: () => void;
  onSubmit?: () => void;
  btnText?: string;
};
function FormFooterBtns({ onClose, onSubmit, btnText }: Props) {
  return (
    <footer className="row justify-end gap-2 my-1">
      <button onClick={onClose} className="text-btn">
        Close
      </button>
      <button className="primary-btn" type="submit">
        {btnText ? btnText : "Submit"}
      </button>
    </footer>
  );
}

export default FormFooterBtns;
