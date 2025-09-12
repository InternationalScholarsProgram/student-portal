import React, { ReactNode } from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  header: string | ReactNode;
  childrenClassName?: string;
};

const ContentComponent: React.FC<Props> = ({
  header,
  childrenClassName,
  children,
  ...props
}) => (
  <div {...props}>
    <h3 className="title-sm text-primary-main">{header}</h3>
    <div className={`col card sm:p-3 p-1 ${childrenClassName}`}>{children}</div>
  </div>
);
export default ContentComponent;
