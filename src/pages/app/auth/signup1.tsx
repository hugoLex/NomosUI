import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { FormikProps } from "formik";
import ErrorMessageCtn from "@app/components/app/authentication/ErrorMessage";
import ErrorMessageServer from "@app/components/app/authentication/ErrorMessageServer";
import AuthBtn from "@app/components/app/authentication/AuthBtn";
import { SignUpInitialStateT } from "./signup";
interface ChildProps {
  formik: FormikProps<SignUpInitialStateT>;
  errorMessage: string | null;
  isLoading: boolean;
  setActiveForm: Dispatch<SetStateAction<string | null>>;
}

const SignupForm1: React.FC<ChildProps> = ({
  formik,
  isLoading,
  errorMessage,
  setActiveForm,
}) => {
  // const SignupForm1 = ({ formik }: { formik: ReturnType<typeof useFormik> }) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    formik.setValues((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <div className="Form1">
      {/* <div className="text-center ">
        <Link className="mt-[35px] mb-[20px] flex justify-center" href={"/"}>
          <Image src={logo} alt="Lex Logo" className="mx-auto h-10 w-auto" />
        </Link>
        <p className="text-[1.5rem] mb-[1.81rem] text-black  font-semibold leading-[normal]">
          Complete your registeration!
        </p>
      </div> */}
      <div className="pt-[40px] mb-[18px] relative  ">
        <span className="mb-[5px] text-[0.75rem] font-normal inline-block">
          Select Account Type
        </span>
        <div className="pick-status flex w-full gap-5  text-base">
          <div className="basis-1/2 flex gap-[10px] items-center px-[20px] py-[16px] rounded-[5px] border border-solid border-gray-black ">
            <input
              type="radio"
              name="role"
              value="STUDENT"
              checked={formik.values.role === "STUDENT"}
              //   value={formik.values.STUDENT}
              onBlur={() => {
                formik.setTouched({ ["role"]: true });
              }}
              onChange={handleChange}
              className="focus:outline-0  w-[18px] h-[18px] font-normal text-gray-authinput text-sm"
            />
            <label htmlFor="role">Student</label>
          </div>
          <div className="basis-1/2 flex items-center gap-[10px] px-[20px] py-[16px] rounded-[5px] border border-solid border-gray-black ">
            <input
              type="radio"
              name="role"
              value="PROFESSIONAL"
              //   value={formik.values.PROFESSIONAL}
              checked={formik.values.role === "PROFESSIONAL"}
              onBlur={() => {
                formik.setTouched({ ["role"]: true });
                // console.log("clicked", "password");
              }}
              onChange={handleChange}
              className="focus:outline-0  w-[18px] h-[18px] font-normal text-gray-authinput text-sm"
            />
            <label htmlFor="role">Professional</label>
          </div>
        </div>

        <ErrorMessageCtn>
          {formik.touched.role && formik.errors.role
            ? formik.errors.role
            : null}
          {/* {(formik.touched.professional || formik.touched.student) &&
          (formik.errors.professional || formik.errors.student)
            ? formik.errors.professional || formik.errors.student
            : null} */}
        </ErrorMessageCtn>
      </div>
      <div className=" focus-within:mb-[1.5rem] relative">
        <span className="mb-[5px] text-[0.75rem] font-normal inline-block">
          {formik.values.role === "PROFESSIONAL"
            ? "Organisation Name"
            : "University"}
        </span>
        <div className="flex items-center px-[20px] py-[16px] rounded-[5px] border border-solid border-gray-black">
          <input
            type="text"
            name="organization"
            onBlur={() => {
              formik.setTouched({ ["organization"]: true });
              // console.log("clicked", "password");
            }}
            value={formik.values.organization}
            onChange={handleChange}
            placeholder={
              formik.values.role === "PROFESSIONAL"
                ? "Organisation Name"
                : "University"
            }
            className="focus:outline-0  block w-full  font-normal text-gray-authinput text-sm"
          />
        </div>

        <ErrorMessageCtn>
          {formik.touched.organization && formik.errors.organization
            ? formik.errors.organization
            : null}
        </ErrorMessageCtn>
      </div>

      <div className=" relative flex items-center mt-[30px]">
        {errorMessage && (
          <ErrorMessageServer>{errorMessage}</ErrorMessageServer>
        )}
        {/* {formik.isValid ? ( */}
        <button
          // disabled={}
          onClick={() => setActiveForm("form2")}
          type="button"
          className={`w-full 
       disabled:cursor-not-allowed py-[16px] px-4 h-[56px]  tracking-wide text-white transition-colors duration-200 bg-blue_btn rounded-[5px]`}
        >
          Continue
        </button>
        {/* ) : (
          <AuthBtn
            btnProps={{
              isLoading,
              action: errorMessage ? "Try again" : "Submit",
            }}
          />
        )} */}
      </div>
      <div className="text-center pt-[66px]">
        <p className="text-sm font-normal font-rubik ">
          Need help?{" "}
          <Link
            className=" text-primary cursor-pointer underline"
            href="/auth/signup"
          >
            Contact Support
          </Link>
        </p>

        <p className="text-[0.75rem] mb-[1.81rem] text-gray-authinput font-rubik mt-[24px]">
          ©2019-2025 All Rights Reserved. LexAnalytics®
        </p>
      </div>
    </div>
  );
};

export default SignupForm1;
{
  /* <div className="bg-[#DEEDE4] px-[10px] py-1 rounded-md shadow-[0px_1px_1px_0px_#C2C2C2]">
  <span className="text-[#0C6630] font-[700] text-nowrap font-rubik">
    40% OFF applied
  </span>
</div>; */
}
