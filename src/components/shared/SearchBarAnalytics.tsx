import React, { useState } from "react";
import { LiaSearchMinusSolid } from "react-icons/lia";
type inputStateT = {
  [x: string]: string;
};
type AllCounselsJudgesViewT = { type: string; classname: string };
const SearchBarAnalytics = ({ type, classname }: AllCounselsJudgesViewT) => {
  const [name, setValues] = useState<inputStateT>({ [type]: "" });
  return (
    <div className="flex gap-5 items-center py-[9px] px-[16px] border border-solid border-gray-200 rounded-[32px]">
      <svg
        className=" flex-shrink-0"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 6.5C11.5 5.17392 10.9732 3.90215 10.0355 2.96447C9.09785 2.02678 7.82608 1.5 6.5 1.5C5.17392 1.5 3.90215 2.02678 2.96447 2.96447C2.02678 3.90215 1.5 5.17392 1.5 6.5C1.5 7.82608 2.02678 9.09785 2.96447 10.0355C3.90215 10.9732 5.17392 11.5 6.5 11.5C7.82608 11.5 9.09785 10.9732 10.0355 10.0355C10.9732 9.09785 11.5 7.82608 11.5 6.5ZM10.5344 11.5969C9.42813 12.475 8.025 13 6.5 13C2.90937 13 0 10.0906 0 6.5C0 2.90937 2.90937 0 6.5 0C10.0906 0 13 2.90937 13 6.5C13 8.025 12.475 9.42813 11.5969 10.5344L15.7812 14.7188C16.075 15.0125 16.075 15.4875 15.7812 15.7781C15.4875 16.0687 15.0125 16.0719 14.7219 15.7781L10.5344 11.5969Z"
          fill="#64645F"
        />
      </svg>

      <input
        name={type}
        className="appearance-none h-[20px] w-full block bg-transparent outline-none text-gray-700 leading-tight focus:outline-none focus:bg- placeholder:text-gray-300 placeholder:font-normal placeholder:text-[14px] white"
        placeholder={"Search the database..."}
        value={
          name[type]
          // formik.values[
          //   item.name as keyof typeof formik.values
          // ]
        }
        onChange={(e) => {
          const { value, name } = e.target;
          setValues((prev) => ({
            ...prev,
            [name]: value,
          }));
        }}
      />
    </div>
  );
};

export default SearchBarAnalytics;
