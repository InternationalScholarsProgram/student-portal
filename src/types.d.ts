import React from "react";

// declare module "react" {
//   interface ButtonHTMLAttributes<T> extends React.ButtonHTMLAttributes<T> {
//     btnstyles?: string;
//   }
// }

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnstyles?: string;
}
interface ModalProps {
  open: boolean;
  toggleModal: () => void;
}

export type { CustomButtonProps, ModalProps };