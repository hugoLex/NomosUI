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
import Link from "next/link";
import SmallLoadingSpinner from "@app/components/app/authentication/smLoadingSpinner";

let currentOTPIndex = 0;

const VerifyEmailPage = () => {
  const [veriyEmail, { isLoading, isError, isSuccess }] =
    useVeriyEmailMutation();
  // const isSuccess = true;
  const [resendVerificationCode, { isSuccess: resendSuccess }] =
    useResendVerificationCodeMutation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const token = searchParams.get("token");
  // console.log("email is available", email);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMsg] = useState<string | null>(null);

  async function verify_user() {
    try {
      const res = await veriyEmail({ token }).unwrap();
      if (res) {
        console.log("Response from verify email", res);
        router.push(`/auth/sc-verification?email=${email}`);
      }
    } catch (error) {
      console.log("Error from verify email", error);
      setErrorMsg((error as { data: { token: string } }).data.token);
      // throw error;
    }
  }
  useEffect(() => {
    token && verify_user();
    // inputRef.current[0].focus();
    // inputRef?.current?.addEventListener("paste", pasteText);
    // return () => inputRef?.current?.removeEventListener("paste", pasteText);
    // inputRef.current[0].addEventListener("paste", pasteText);
    // return () => inputRef.current[0].removeEventListener("paste", pasteText);
  }, [token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const apiUrl = "https://api.growthclub.life/api/verify-email";
    try {
      const res = await veriyEmail({ token }).unwrap();
      if (res) {
        console.log(res);

        router.push(`/auth/sc-verification?email=${email}`);
      }
    } catch (error) {
      console.log(error);
      // throw error;
    }
  };

  const resendLink = async () => {
    // setIsLoading(true);
    setError(false);

    try {
      const res = await resendVerificationCode({
        email: email,
      }).unwrap();

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
          <div className="max-w-[25.6875rem] w-full mx-auto max-lg:pl-[1.37rem] max-lg:pr-[1.38rem] bg-white">
            <div className="text-default2 mb-[3.31rem] font-normal lg:mb-[5.69rem] xl:ml-[-50px]">
              <h3 className="text-[1.74419rem] md:text-[2rem] lg:text-[1.25rem] leading-[normal]">
                Verify Your Email
              </h3>
              <p className="text-[0.87206rem] md:text-base mt-[0.87rem] md:mt-[0.44rem] max-w-[19.0625rem] leading-[1.25rem]">
                It will only take few seconds
              </p>
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex justify-center text-center pt-2">
                  {isError && !isSuccess && (
                    <h2 className="text-sm text-estateRed text-red-500">
                      {errorMessage}
                    </h2>
                  )}

                  {isSuccess && (
                    <h2 className="text-left text-sm text-primary">
                      Welcome to Lexanalytics where research and drafting is at
                      your finger tips.
                      <span className="block text-">
                        Your account has been verified successfully! Please
                        login to begin.
                      </span>
                    </h2>
                  )}
                </div>

                <div className="w-full pb-2">
                  <div className="flex items-center mt-[2.87rem] ">
                    {isLoading ? (
                      <SmallLoadingSpinner />
                    ) : isSuccess ||
                      errorMessage == "Account is already confirmed" ? (
                      <Link
                        href={"/auth/login"}
                        className=" w-full text-center py-[16px] px-4 h-[56px]  tracking-wide text-white transition-colors duration-200 bg-blue_btn rounded-[5px]"
                      >
                        Login
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </form>

              {errorMessage != "Account is already confirmed" && (
                <h2 className="text-center text-base">
                  <span className="text-">
                    Didn&apos;t receive verification email?
                  </span>

                  <Link
                    href={""}
                    className="text-[green] ml-[10px] cursor-pointer"
                    // onClick={resendLink}
                  >
                    Resend
                  </Link>
                </h2>
              )}
            </div>
          </div>
        </div>
        <AuthSideCover page="email-verification" />
      </div>
    </section>
  );
};

export default VerifyEmailPage;
