import React from "react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import BigBarForRightSideLayout from "../generalSharedComponents/BigBarForRightSideLayout";

function JudgeCounselGraphLayout() {
  return (
    <section className="basis-[40%]">
      <div className="sticky top-[68px]  py-[2rem] w-full">
        {/* <div className="sticky top-[68px] bg-gray-100 p-[2rem]"> */}
        {/* <div className="flex gap-2 items-center"> */}

        <h5 className="relative flex gap-2 items-center pl- [8px] text-base text-[#171F46] font-midium font-rubik">
          <HiAdjustmentsHorizontal
            size={24}
            className=""
            // className="absolute left-[-20px] top-[4px]"
          />
          Graphs
        </h5>

        <div className="w-full">
          {["Case timeline", "Decision relationship"].map((item) => (
            <BigBarForRightSideLayout
              title={item}
              //  icon={}
              style={{
                ctnStyle: "string",
                icon: "string",
              }}
              key={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default JudgeCounselGraphLayout;
