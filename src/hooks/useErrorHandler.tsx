import { useState } from "react";

const useErrorHandler = () => {
  const [error, setError] = useState(null);

  const handleError = (err: any) => {
    setError(err);
  };

  return { error, handleError };
};

export default useErrorHandler;
