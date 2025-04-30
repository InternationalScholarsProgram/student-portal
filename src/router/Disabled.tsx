import ErrorElement from "./ErrorElement";

const Disabled = () => {
  return (
    <div className="h-screen w-screen col-center">
      <ErrorElement
        error={{ message: "Your Account has been disabled" }}
        resetErrorBoundary={() => {}}
      />
    </div>
  );
};

export default Disabled;
