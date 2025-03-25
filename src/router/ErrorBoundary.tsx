"use client";
import React from "react";
import ErrorElement from "./ErrorElement";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

function fallbackRender({ error, resetErrorBoundary }: any) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div className="h-full w-full col-center" role="alert">
      <div className="h-1/2 col justify-center">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p style={{ color: "red" }}>{error.message}</p>
      </div>
    </div>
  );
}


function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary
      fallbackRender={ErrorElement}
      onReset={(details) => {
        // Reset the state of your app so the error doesn't happen again
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}

export default ErrorBoundary;
