"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useResendVerificationCodeMutation,
  useVeriyEmailMutation,
} from "@app/store/services/authenticationslice";
import AuthSideCover from "@app/components/app/authentication/AuthSideCover";
import AuthBtn from "@app/components/app/authentication/AuthBtn";
// import {
//   useResendVerificationCodeMutation,
//   useVeriyEmailMutation,
// } from "@/redux/features/auth/authApiSlice";
// import AuthBtn from "@/components/authentication/AuthBtn";
// import AuthSideCover from "@/components/authentication/AuthSideCover";
// import { toast } from "react-toastify";

let currentOTPIndex = 0;

const VerifyEmailPage = () => {
  const [veriyEmail, { isLoading, isError }] = useVeriyEmailMutation();
  const [resendVerificationCode, { isSuccess }] =
    useResendVerificationCodeMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  // const mobileView = searchParams.get("open");UseQueryToggler

  const subPlan = searchParams.get("subPlan");
  const email = searchParams.get("email");
  const id = searchParams.get("id");
  // console.log("email is available", email);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);
  const [error, setError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [errorMessage, setErrorMsg] = useState(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // console.log("value from input", value);
    // when paste event occurs it comes with all the 6 numbers, hence the code below shouldn't run
    // the paste event handles the update in the useeffect
    if (value.toString().length <= 1) {
      const newOTP = [...otp];
      newOTP[currentOTPIndex] = value.substring(value.length - 1);

      if (!value) setActiveOTPIndex(currentOTPIndex - 1);
      else setActiveOTPIndex(currentOTPIndex + 1);
      console.log("the otp array", newOTP);
      setOtp(newOTP);
    }
  };

  const handleOnKeydown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOTPIndex = index;
    if (event.key === "Backspace") setActiveOTPIndex(currentOTPIndex - 1);
  };

  useEffect(() => {
    // inputRef.current[0].focus();
    inputRef?.current?.addEventListener("paste", pasteText);
    return () => inputRef?.current?.removeEventListener("paste", pasteText);
    // inputRef.current[0].addEventListener("paste", pasteText);
    // return () => inputRef.current[0].removeEventListener("paste", pasteText);
  }, []);
  function pasteText(e: ClipboardEvent) {
    if (e.clipboardData?.getData("text")) {
      const pastedText = e.clipboardData?.getData("text");
      console.log("text pasted", pastedText.split(""));
      setOtp(pastedText.split(""));
      // const fieldValues={}
      // const fieldValues = Object.keys.apply(otp).forEach((keys, index) => {
      //   fieldValues[keys] = pastedText[index];
      // }
      // );
      // formik.setValues({ otp: pastedText.split("") });
      console.log("ref object", inputRef);
      // inputRef.current[5].focus();
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, [activeOTPIndex]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newOtp = otp.join("");
    console.log("new otp", parseInt(newOtp));

    const getToken = {
      email: email,
      verificationCode: newOtp,
    };
    console.log(getToken);
    // const apiUrl = "https://api.growthclub.life/api/verify-email";
    try {
      const res = await veriyEmail(getToken).unwrap();
      if (res && subPlan) {
        router.push(`/auth/login?plan=${subPlan}`);
      } else if (res && id) {
        router.push(`/auth/login?id=${id}`);
      } else if (res && !subPlan) {
        router.push(`/auth/login`);
      }
      // const res = await veriyEmail(JSON.stringify(getToken)).unwrap();
      // const response = await fetch(apiUrl, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(getToken),
      // });
      // const data = await response.json();
      // console.log(res, "returned after calling this");
      // console.log(data, "returned after calling this");
      // return res;
      // return data;
    } catch (error) {
      console.log(error);
      // throw error;
    }
  };

  // const handleSubmit = async (values, { setSubmitting }) => {

  //   const newOtp = otp.join("");
  //   console.log("new otp", newOtp)

  // };

  const resendLink = async () => {
    // setIsLoading(true);
    setError(false);

    try {
      // const emailGotten = getCookie("email");
      // console.log("email available", email);
      const res = await resendVerificationCode({
        email: email,
      }).unwrap();
      // const data = await resendOtp(emailGotten);
      // toast.success(res?.message, {});
      // toast.success(data?.data?.message, {});
      // if (res?.data) {
      //   router.push(`/auth/login`, {
      //     scroll: false,
      //   });
      // }
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
    // setIsLoading(false);
  };

  return (
    <section className=" h-screen lg:overflow-scroll text-default2 custom-color-scheme">
      <div className=" lg:grid h-full grid-cols-2 items-center relative bg-white">
        <div className="relative lg:z-0 grid items-center h-full max-lg:pt-[100px]">
          {/* max-w-[25.6875rem]*/}
          <div className="max-w-[25.6875rem] mx-auto max-lg:pl-[1.37rem] max-lg:pr-[1.38rem] bg-white">
            <div className="text-default2 mb-[3.31rem] font-normal lg:mb-[5.69rem] xl:ml-[-50px]">
              <h3 className="text-[1.74419rem] md:text-[2rem] lg:text-[1.25rem] leading-[normal]">
                Verify Your Email
              </h3>
              <p className="text-[0.87206rem] md:text-base mt-[0.87rem] md:mt-[0.44rem] max-w-[19.0625rem] leading-[1.25rem]">
                Copy the verification code in your mail to verify this account
              </p>
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <div className=" flex">
                  {otp.map((_, index) => {
                    return (
                      <React.Fragment key={index}>
                        <input
                          ref={index === activeOTPIndex ? inputRef : null}
                          type="number"
                          className={`h-[3rem] w-[2.5rem] md:w-[3rem]  lg:h-[3.75rem] lg:w-[3.75rem]  border border-solid ${
                            error
                              ? "bg-estateFormRed focus:outline-estateRed focus:bg-estateFormRed/[.16]"
                              : "border-[#334155] focus:outline-[#27AE60] focus:bg-[#27AE60]/[.16]"
                          }  outline-none 
                  text-center font-semibold text-xl border-gray-400 
                   focus:text-gray-700 text-gray-400 transition spin-button-none`}
                          onChange={handleOnChange}
                          onKeyDown={(e) => handleOnKeydown(e, index)}
                          value={otp[index]}
                        />
                        {index === otp.length - 1 ? null : (
                          <span className="px-1" />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
                <div className="flex justify-center text-center pt-2">
                  {isError && (
                    <h2 className="text-sm text-estateRed">
                      Error validating your mail
                      {/* The OTP is incorrect! */}
                    </h2>
                  )}
                  {numberError && (
                    <h2 className="text-sm text-estateRed">
                      Please complete your OTP!
                    </h2>
                  )}
                  {isSuccess && (
                    <h2 className="text-left text-sm text-primary">
                      New verification code sent successfully!
                      <span className="block text-">
                        If you can&apos;t find the code or link in your inbox,
                        please, check your spam folder.
                      </span>
                    </h2>
                  )}
                </div>

                <div className="w-full pb-2">
                  <div className="flex items-center mt-[2.87rem]">
                    {
                      <AuthBtn
                        btnProps={{
                          isLoading,
                          action: isError ? "Try again" : "Submit verification",
                        }}
                      />
                    }
                  </div>
                </div>
              </form>

              <h2 className="text-center text-base">
                <span className="text-">
                  Didn&apos;t receive verification code?
                </span>

                <span
                  className="text-[green] ml-[10px] cursor-pointer"
                  onClick={resendLink}
                >
                  Resend
                </span>
              </h2>
            </div>
          </div>
        </div>
        <AuthSideCover page="email-verification" />
      </div>
    </section>
  );
};

export default VerifyEmailPage;
