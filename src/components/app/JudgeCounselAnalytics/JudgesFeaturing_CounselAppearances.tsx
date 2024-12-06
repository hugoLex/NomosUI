import React from "react";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";

type componentsubheading = {
  children: React.ReactNode;
};

const JudgesFeaturing_CounselAppearances: React.FC<componentsubheading> = ({
  children,
}) => {
  return (
    <div className="flex gap-5 items-center mt-[40px]">
      <HiOutlineBuildingLibrary size={30} className=" " />
      <h2 className="  text-[1.5rem] font-normal leading-none font-rubik text-black/50  ">
        {children}
      </h2>
    </div>
  );
};

export default JudgesFeaturing_CounselAppearances;
