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

export type { CustomButtonProps };