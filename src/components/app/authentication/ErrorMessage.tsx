import React from "react";

function ErrorMessageCtn({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[red] text-[.7rem] absolute left-[0.24rem] bottom-[-15px] whitespace-nowrap">
      {children}
    </span>
  );
}

export default ErrorMessageCtn;
