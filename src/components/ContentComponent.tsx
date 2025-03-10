import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  header: string; // `header` is a required string
};

const ContentComponent: React.FC<Props> = ({ header, children, ...props }) => (
  <div {...props}>
    <h3 className="title-sm">{header}</h3>
    <div className="col card sm:p-3 p-1">{children}</div>
  </div>
);
export default ContentComponent;
