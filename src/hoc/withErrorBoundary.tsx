import React, { useEffect } from "react";
import type { ReactNode } from "react";
import { useErrorHandler } from "@app/hooks";

const WithErrorBoundary = ({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback: ReactNode;
}) => {
  const { error, handleError } = useErrorHandler();

  useEffect(() => {
    try {
      // Assume we can run some rendering logic here
    } catch (err) {
      handleError(err);
    }
  }, [handleError]);

  if (error) {
    return fallback || <h1>Something went wrong.</h1>;
  }

  return children;
};

export default WithErrorBoundary;
