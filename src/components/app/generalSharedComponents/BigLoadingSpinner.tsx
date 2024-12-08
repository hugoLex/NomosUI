import { Loader } from "@app/components/ui";
import React from "react";

const BigLoadingSpinner = () => {
  return (
    <div className=" flex-1 flex flex-col justify-center items-center self-stretch py-6 min-h-[]">
      <Loader variant="classic" size={80} />
    </div>
  );
};

export default BigLoadingSpinner;
