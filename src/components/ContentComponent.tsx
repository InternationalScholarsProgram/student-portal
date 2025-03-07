const ContentComponent = ({
  header,
  children,
}: {
  header: string;
  children: any;
}) => (
  <div>
    <h3 className="title-sm">{header}</h3>
    <div className="col card sm:p-3 p-1">{children}</div>
  </div>
);
export default ContentComponent;
