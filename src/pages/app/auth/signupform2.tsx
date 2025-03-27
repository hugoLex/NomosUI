import React, { Dispatch, SetStateAction, useState } from "react";
import { FormikProps } from "formik";
import ErrorMessageCtn from "@app/components/app/authentication/ErrorMessage";
import ErrorMessageServer from "@app/components/app/authentication/ErrorMessageServer";
import { SignUpInitialStateT } from "./signup";

interface ChildProps {
  formik: FormikProps<SignUpInitialStateT>;
  errorMessage: string | null;
  isLoading: boolean;
  setActiveForm: Dispatch<SetStateAction<string | null>>;
}

const SignupForm2: React.FC<ChildProps> = ({
  formik,
  isLoading,
  errorMessage,
  setActiveForm,
}) => {
  const [pwdInputType, setPwdInputType] = useState(true);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    formik.setValues((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <div className="form2">
      <div className="pt-[40px] mb-[18px] relative  ">
        <span className="mb-[5px] text-[0.75rem] font-normal inline-block">
          Full Name
        </span>
        <div className="flex items-center px-[20px] py-[16px] rounded-[5px] border border-solid border-gray-black ">
          {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="17"
          viewBox="0 0 22 17"
          fill="none"
          className="mt-[2px] fill-[#8C7B8F] "
        >
          <path
            d="M0 2.83333C0 1.26836 1.23105 0 2.75 0H19.25C20.7668 0 22 1.26836 22 2.83333V14.1667C22 15.7294 20.7668 17 19.25 17H2.75C1.23105 17 0 15.7294 0 14.1667V2.83333ZM2.0625 2.83333V3.81172L9.47461 10.0805C10.3598 10.8331 11.6402 10.8331 12.5254 10.0805L19.9375 3.81172V2.79349C19.9375 2.44375 19.6281 2.08516 19.25 2.08516H2.75C2.37016 2.08516 2.0625 2.44375 2.0625 2.79349V2.83333ZM2.0625 6.56094V14.1667C2.0625 14.5563 2.37016 14.875 2.75 14.875H19.25C19.6281 14.875 19.9375 14.5563 19.9375 14.1667V6.56094L13.8359 11.7229C12.1859 13.1174 9.81406 13.1174 8.12539 11.7229L2.0625 6.56094Z"
            // fill="#8C7B8F"
          />
        </svg> */}
          <input
            type="text"
            name="full_name"
            value={formik.values.full_name}
            onBlur={() => {
              formik.setTouched({ ["full_name"]: true });
              // console.log("clicked", "password");
            }}
            placeholder="Full name"
            onChange={handleChange}
            className="focus:outline-0  w-full font-normal text-gray-authinput text-sm"
          />
        </div>

        <ErrorMessageCtn>
          {formik.touched.full_name && formik.errors.full_name
            ? formik.errors.full_name
            : null}
        </ErrorMessageCtn>
      </div>
      <div className=" mb-[18px] relative  ">
        <span className="mb-[5px] text-[0.75rem] font-normal inline-block">
          Your Email
        </span>
        <div className="flex items-center px-[20px] py-[16px] rounded-[5px] border border-solid border-gray-black ">
          {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="17"
          viewBox="0 0 22 17"
          fill="none"
          className="mt-[2px] fill-[#8C7B8F] "
        >
          <path
            d="M0 2.83333C0 1.26836 1.23105 0 2.75 0H19.25C20.7668 0 22 1.26836 22 2.83333V14.1667C22 15.7294 20.7668 17 19.25 17H2.75C1.23105 17 0 15.7294 0 14.1667V2.83333ZM2.0625 2.83333V3.81172L9.47461 10.0805C10.3598 10.8331 11.6402 10.8331 12.5254 10.0805L19.9375 3.81172V2.79349C19.9375 2.44375 19.6281 2.08516 19.25 2.08516H2.75C2.37016 2.08516 2.0625 2.44375 2.0625 2.79349V2.83333ZM2.0625 6.56094V14.1667C2.0625 14.5563 2.37016 14.875 2.75 14.875H19.25C19.6281 14.875 19.9375 14.5563 19.9375 14.1667V6.56094L13.8359 11.7229C12.1859 13.1174 9.81406 13.1174 8.12539 11.7229L2.0625 6.56094Z"
            // fill="#8C7B8F"
          />
        </svg> */}
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onBlur={() => {
              formik.setTouched({ ["email"]: true });
              // console.log("clicked", "password");
            }}
            placeholder="Email"
            onChange={handleChange}
            className="focus:outline-0  w-full font-normal text-gray-authinput text-sm"
          />
        </div>

        <ErrorMessageCtn>
          {formik.touched.email && formik.errors.email
            ? formik.errors.email
            : null}
        </ErrorMessageCtn>
      </div>
      <div className=" focus-within: mb-[18px] relative">
        <span className="mb-[5px] text-[0.75rem] font-normal inline-block">
          Your Password
        </span>
        <div className="flex items-center px-[20px] py-[16px] rounded-[5px] border border-solid border-gray-black">
          {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="23"
          viewBox="0 0 20 23"
          fill="none"
          className="stroke-[#8C7B8F] "
        >
          <path
            d="M16.4847 10.9984L17.1678 10.96C18.1712 10.974 19 11.8326 19 12.817V19.9598C19 20.9853 18.1686 21.817 17.1429 21.817H2.85714C1.8314 21.817 1 20.9853 1 19.9598V12.817C1 11.7995 1.81776 10.9734 2.832 10.96L3.51527 10.9984L4.57143 11.0578V10V6.42857C4.57143 3.43577 7.00719 1 10 1C12.9928 1 15.4286 3.43577 15.4286 6.42857V10V11.0578L16.4847 10.9984ZM13.5714 11H14.5714V10V6.42857C14.5714 3.90648 12.5209 1.85714 10 1.85714C7.47913 1.85714 5.42857 3.90648 5.42857 6.42857V10V11H6.42857H13.5714Z"
            // stroke="#8C7B8F"
            strokeWidth="2"
          />
        </svg> */}
          <input
            type={pwdInputType ? "password" : "text"}
            name="password"
            onBlur={() => {
              formik.setTouched({ ["password"]: true });
              // console.log("clicked", "password");
            }}
            value={formik.values.password}
            onChange={handleChange}
            placeholder="Password"
            className="focus:outline-0  block w-full  font-normal text-gray-authinput text-sm"
          />
          <svg
            className="fill-[#8C7B8F] "
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="16"
            viewBox="0 0 21 16"
            fill="none"
            onClick={() => setPwdInputType(!pwdInputType)}
          >
            <path
              d="M19.9235 7.6C17.9035 2.91 14.1035 0 10.0035 0C5.90348 0 2.10348 2.91 0.0834848 7.6C0.0284215 7.72617 0 7.86234 0 8C0 8.13766 0.0284215 8.27383 0.0834848 8.4C2.10348 13.09 5.90348 16 10.0035 16C14.1035 16 17.9035 13.09 19.9235 8.4C19.9785 8.27383 20.007 8.13766 20.007 8C20.007 7.86234 19.9785 7.72617 19.9235 7.6ZM10.0035 14C6.83348 14 3.83348 11.71 2.10348 8C3.83348 4.29 6.83348 2 10.0035 2C13.1735 2 16.1735 4.29 17.9035 8C16.1735 11.71 13.1735 14 10.0035 14ZM10.0035 4C9.21236 4 8.439 4.2346 7.7812 4.67412C7.12341 5.11365 6.61072 5.73836 6.30797 6.46927C6.00522 7.20017 5.926 8.00444 6.08034 8.78036C6.23468 9.55628 6.61565 10.269 7.17506 10.8284C7.73447 11.3878 8.4472 11.7688 9.22312 11.9231C9.99905 12.0775 10.8033 11.9983 11.5342 11.6955C12.2651 11.3928 12.8898 10.8801 13.3294 10.2223C13.7689 9.56448 14.0035 8.79113 14.0035 8C14.0035 6.93913 13.5821 5.92172 12.8319 5.17157C12.0818 4.42143 11.0644 4 10.0035 4ZM10.0035 10C9.60792 10 9.22124 9.8827 8.89234 9.66294C8.56345 9.44318 8.3071 9.13082 8.15573 8.76537C8.00435 8.39991 7.96474 7.99778 8.04191 7.60982C8.11908 7.22186 8.30957 6.86549 8.58927 6.58579C8.86898 6.30608 9.22534 6.1156 9.6133 6.03843C10.0013 5.96126 10.4034 6.00087 10.7689 6.15224C11.1343 6.30362 11.4467 6.55996 11.6664 6.88886C11.8862 7.21776 12.0035 7.60444 12.0035 8C12.0035 8.53043 11.7928 9.03914 11.4177 9.41421C11.0426 9.78929 10.5339 10 10.0035 10Z"
              // fill="#8C7B8F"
            />
          </svg>
        </div>
        {/* <span className="text-[red] absolute left-[0.94rem] bottom-[-20px] whitespace-nowrap"> */}
        <ErrorMessageCtn>
          {formik.touched.password && formik.errors.password
            ? formik.errors.password
            : null}
        </ErrorMessageCtn>
      </div>
      <div className=" focus-within: mb-[18px] relative">
        <span className="mb-[5px] text-[0.75rem] font-normal inline-block">
          Confirm Password
        </span>
        <div className="flex items-center px-[20px] py-[16px] rounded-[5px] border border-solid border-gray-black">
          {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="23"
          viewBox="0 0 20 23"
          fill="none"
          className="stroke-[#8C7B8F] "
        >
          <path
            d="M16.4847 10.9984L17.1678 10.96C18.1712 10.974 19 11.8326 19 12.817V19.9598C19 20.9853 18.1686 21.817 17.1429 21.817H2.85714C1.8314 21.817 1 20.9853 1 19.9598V12.817C1 11.7995 1.81776 10.9734 2.832 10.96L3.51527 10.9984L4.57143 11.0578V10V6.42857C4.57143 3.43577 7.00719 1 10 1C12.9928 1 15.4286 3.43577 15.4286 6.42857V10V11.0578L16.4847 10.9984ZM13.5714 11H14.5714V10V6.42857C14.5714 3.90648 12.5209 1.85714 10 1.85714C7.47913 1.85714 5.42857 3.90648 5.42857 6.42857V10V11H6.42857H13.5714Z"
            // stroke="#8C7B8F"
            strokeWidth="2"
          />
        </svg> */}
          <input
            type={pwdInputType ? "password" : "text"}
            name="confirm_password"
            onBlur={() => {
              formik.setTouched({ ["confirm_password"]: true });
              // console.log("clicked", "confirm_password");
            }}
            value={formik.values.confirm_password}
            onChange={handleChange}
            placeholder="confirm password"
            className="focus:outline-0  block w-full  font-normal text-gray-authinput text-sm"
          />
          <svg
            className="fill-[#8C7B8F] "
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="16"
            viewBox="0 0 21 16"
            fill="none"
            onClick={() => setPwdInputType(!pwdInputType)}
          >
            <path
              d="M19.9235 7.6C17.9035 2.91 14.1035 0 10.0035 0C5.90348 0 2.10348 2.91 0.0834848 7.6C0.0284215 7.72617 0 7.86234 0 8C0 8.13766 0.0284215 8.27383 0.0834848 8.4C2.10348 13.09 5.90348 16 10.0035 16C14.1035 16 17.9035 13.09 19.9235 8.4C19.9785 8.27383 20.007 8.13766 20.007 8C20.007 7.86234 19.9785 7.72617 19.9235 7.6ZM10.0035 14C6.83348 14 3.83348 11.71 2.10348 8C3.83348 4.29 6.83348 2 10.0035 2C13.1735 2 16.1735 4.29 17.9035 8C16.1735 11.71 13.1735 14 10.0035 14ZM10.0035 4C9.21236 4 8.439 4.2346 7.7812 4.67412C7.12341 5.11365 6.61072 5.73836 6.30797 6.46927C6.00522 7.20017 5.926 8.00444 6.08034 8.78036C6.23468 9.55628 6.61565 10.269 7.17506 10.8284C7.73447 11.3878 8.4472 11.7688 9.22312 11.9231C9.99905 12.0775 10.8033 11.9983 11.5342 11.6955C12.2651 11.3928 12.8898 10.8801 13.3294 10.2223C13.7689 9.56448 14.0035 8.79113 14.0035 8C14.0035 6.93913 13.5821 5.92172 12.8319 5.17157C12.0818 4.42143 11.0644 4 10.0035 4ZM10.0035 10C9.60792 10 9.22124 9.8827 8.89234 9.66294C8.56345 9.44318 8.3071 9.13082 8.15573 8.76537C8.00435 8.39991 7.96474 7.99778 8.04191 7.60982C8.11908 7.22186 8.30957 6.86549 8.58927 6.58579C8.86898 6.30608 9.22534 6.1156 9.6133 6.03843C10.0013 5.96126 10.4034 6.00087 10.7689 6.15224C11.1343 6.30362 11.4467 6.55996 11.6664 6.88886C11.8862 7.21776 12.0035 7.60444 12.0035 8C12.0035 8.53043 11.7928 9.03914 11.4177 9.41421C11.0426 9.78929 10.5339 10 10.0035 10Z"
              // fill="#8C7B8F"
            />
          </svg>
        </div>
        {/* <span className="text-[red] absolute left-[0.94rem] bottom-[-20px] whitespace-nowrap"> */}
        <ErrorMessageCtn>
          {formik.touched.confirm_password && formik.errors.confirm_password
            ? formik.errors.confirm_password
            : null}
        </ErrorMessageCtn>
      </div>
      <div className=" mb-[18px] relative  ">
        <span className="mb-[5px] text-[0.75rem] font-normal inline-block">
          Phone number
        </span>
        <div className="flex items-center px-[20px] py-[16px] rounded-[5px] border border-solid border-gray-black ">
          <input
            type="text"
            name="phone"
            value={formik.values.phone}
            onBlur={() => {
              formik.setTouched({ ["phone"]: true });
            }}
            placeholder="Phone number"
            onChange={handleChange}
            className="focus:outline-0  w-full font-normal text-gray-authinput text-sm"
          />
        </div>

        <ErrorMessageCtn>
          {formik.touched.phone && formik.errors.phone
            ? formik.errors.phone
            : null}
        </ErrorMessageCtn>
      </div>
      <div className=" relative flex items-center mt-[30px]">
        {errorMessage && (
          <ErrorMessageServer>{errorMessage}</ErrorMessageServer>
        )}
        {formik.isValid ? (
          <button
            // disabled={formik.isValid === false}
            // onClick={() => setActiveForm("form1")}
            type="submit"
            className={`w-full  py-[16px] px-4 h-[56px]  tracking-wide text-white transition-colors duration-200 bg-blue_btn rounded-[5px]`}
          >
            Submit
          </button>
        ) : (
          <button
            // disabled={formik.isValid === false}
            onClick={() => setActiveForm("form1")}
            type="button"
            className={`w-full  py-[16px] px-4 h-[56px]  tracking-wide text-white transition-colors duration-200 bg-blue_btn rounded-[5px]`}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default SignupForm2;
