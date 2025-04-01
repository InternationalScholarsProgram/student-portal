import React from "react";
import LoaderSideBar from "./LoaderSideBar";
type Props = { children: React.ReactNode; name?: string };

const Suspense: React.FC<Props> = ({ children, name }) => {
  return (
    <React.Suspense fallback={<LoaderSideBar />} name={name}>
      {children}
    </React.Suspense>
  );
};

export default Suspense;
