import React from "react";

function ErrorMessageServer({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[red] text-[.7rem] absolute left-[.5rem]  top-[-15px] ">
      {children}
    </span>
  );
}

export default ErrorMessageServer;
