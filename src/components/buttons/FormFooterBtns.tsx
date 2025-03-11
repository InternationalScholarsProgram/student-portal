import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClose?: () => void;
  onSubmit?: () => void;
  btnText?: string | React.ReactNode;
  closeText?: string | React.ReactNode;
  hideBtn?: boolean;
}

const FormFooterBtns: React.FC<Props> = ({
  onClose,
  onSubmit,
  btnText,
  hideBtn,
  closeText,
  ...props
}) => {
  return (
    <footer
      data-html2canvas-ignore // ignore html2canvas when generating pdf
      className="row justify-end gap-2 py-1 "
    >
      <button type="button" onClick={onClose} className="text-btn">
        {closeText || "Close"}
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
