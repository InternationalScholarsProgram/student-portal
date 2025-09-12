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
  const isLoading = typeof btnText === "string" && btnText.includes("...");
  const disabled = props.disabled || isLoading;
  return (
    <footer
      data-html2canvas-ignore // ignore html2canvas when generating pdf
      className="row justify-end gap-2 py-1 "
    >
      {onClose && (
        <button type="button" onClick={onClose} className="text-btn">
          {closeText || "Close"}
        </button>
      )}
      {!hideBtn && (
        <button
          {...props}
          disabled={disabled}
          className={`primary-btn ${disabled && "disabled-btn"}`}
          {...(onSubmit ? { onClick: onSubmit } : { type: "submit" })}
        >
          {btnText ? btnText : "Submit"}
        </button>
      )}
    </footer>
  );
};

export default FormFooterBtns;
