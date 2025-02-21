"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthBtn from "@app/components/app/authentication/AuthBtn";
import ErrorMessageServer from "@app/components/app/authentication/ErrorMessageServer";
import ErrorMessageCtn from "@app/components/app/authentication/ErrorMessage";
import AuthSideCover from "@app/components/app/authentication/AuthSideCover";
import { errorRTK, LLMError } from "@app/types";
import { useForgotPasswordMutation } from "@app/store/services/authenticationslice";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const InitiaState = {
    email: "",
  };
  type InitiaStateT = {
    email: string;
  };
  const [resmessage, setResmessage] = useState(null);

  const [errorMessage, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (
    values: InitiaStateT,
    { resetForm }: { resetForm: any }
  ) => {
    // console.log("handling forgot password query", values.email.toLowerCase());
    setResmessage(null);
    setErrorMsg(null);
    try {
      const res = await forgotPassword({
        email: values.email.toLowerCase(),
      }).unwrap();
      setResmessage(res?.message);
      console.log("Response from forgot password page", res);

      resetForm();
      // if (res) router.push("/auth/login");
    } catch (error) {
      // if (!error) return "No server response";

      if ((error as errorRTK)?.data) {
        setErrorMsg((error as errorRTK)?.data.detail);
        // toast.error((error as errorRtk)?.data?.detail);
      }

      console.log("error message from forgot password", error);
    }
  };
  // function handleChange(e) {
  //   const { name, value } = e.target;
  //   // setFormData((prev) => ({ ...prev, [name]: value }));
  // }
  // if (isLoading) return <Loading />;
  return (
    <section className="lg:h-screen no-scrollbar h-full overflow-scroll text-default">
      <div className=" lg:grid h-full grid-cols-2 items-center relative bg-white">
        <div className=" relative h-full lg:flex items-center">
          {/* <div className=" mt-[2.5rem] lg:mt-[4.69rem] mb-[2.31rem] lg:mb-[5.56rem] w-[10.625rem] mx-auto  ">
            <span className="hidden lg:block">{lgLogo}</span>
            <span className="lg:hidden">{smLogo}</span>
          </div> */}
          <div className="max-lg:mt-[8.19rem] max-lg:pb-[100px] max-w-[485px] w-full mx-auto max-md:px-[35px]  bg-white">
            <div className=" mb-[3.31rem] lg:mb-[3rem] ">
              <h3 className="text-[1.74419rem] lg:text-[2.15rem] font-normal ">
                Forgot your password?
              </h3>
              <p className="text-[0.87206rem] md:text-sm mt-[1rem] md:mt-[0.62rem] ">
                Please enter the email address associated with your account and
                We will email you a link to reset your password.
              </p>
              {resmessage && (
                <p className="text-[red] text-[0.87206rem] md:text- base max-w-[19.0625rem] mt-[1rem] md:mt-[0.62rem] font-normal leading-[normal">
                  {resmessage}. Please check your mailbox.
                </p>
              )}
            </div>

            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string().email().required("Required"),
              })}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="relative mb-[0.8rem]">
                  <div className="flex items-center px-[20px] py-[16px] rounded-[5px] border border-solid border-gray-black ">
                    <Field
                      type="text"
                      name="email"
                      // value={formValue.email}
                      // onChange={handleChange}
                      placeholder="Email Address"
                      className="focus:outline-0  w-full font-normal text-gray-authinput text-sm"
                    />
                  </div>
                  <ErrorMessageCtn>
                    <ErrorMessage name="email" />
                  </ErrorMessageCtn>
                </div>

                <div className=" relative items-center mt-[8.15rem] md:mt-[5rem] lg:mt-[4.87rem]">
                  {errorMessage && (
                    <ErrorMessageServer>
                      {errorMessage && errorMessage}
                    </ErrorMessageServer>
                  )}

                  {
                    <AuthBtn
                      btnProps={{
                        isLoading,
                        action: errorMessage ? "Try again" : "Submit",
                      }}
                    />
                  }
                  <Link href={"/auth/login"}>
                    <button className="bg-[rgba(41,82,255,.1)] mt-[16px] w-full py-[16px] px-4 h-[56px]  tracking-wide text-primary transition-colors duration-200 rounded-[5px]">
                      Back to Login
                    </button>
                  </Link>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
        <AuthSideCover page="forgot-password" />
      </div>
    </section>
  );
};

export default Page;
