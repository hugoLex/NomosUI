"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthBtn from "@app/components/app/authentication/AuthBtn";
import ErrorMessageServer from "@app/components/app/authentication/ErrorMessageServer";
import ErrorMessageCtn from "@app/components/app/authentication/ErrorMessage";
import AuthSideCover from "@app/components/app/authentication/AuthSideCover";
import { errorRTK } from "@app/types";
import {
  useForgot_password_initiateMutation,
  useVeriy_SC_noMutation,
} from "@app/store/services/authenticationslice";
import Link from "next/link";
import SuccessUI from "@app/components/app/authentication/success_ui";
import { toast } from "sonner";

const SCverificationPage = () => {
  const params = useSearchParams();
  const email = params.get("email");
  console.log(email);
  const router = useRouter();
  const [veriy_SC_no, { isLoading, isSuccess }] = useVeriy_SC_noMutation();

  type InitiaStateT = {
    // email: string;
    SC_NO: "";
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
      if (!email) {
        return;
      }
      const res = await veriy_SC_no({
        SC_NO: values.SC_NO,
        email: email.toLowerCase(),
      }).unwrap();
      if (res) {
        router.push(`/auth/onboard?email=${email.toLowerCase()}`);
      }
      console.log("Response from supreme court verification page", res);
      setResmessage(res.message);

      // resetForm();
      // if (res) router.push("/auth/login");
    } catch (error) {
      // if (!error) return "No server response";

      if ((error as errorRTK)?.data.detail) {
        // setErrorMsg();
        toast((error as errorRTK)?.data.detail);
        // toast.error((error as errorRtk)?.data?.detail);
      }
      if (
        (
          error as {
            data: {
              scn_number: string[];
            };
          }
        )?.data.scn_number
      ) {
        toast(
          (
            error as {
              data: {
                scn_number: string[];
              };
            }
          )?.data.scn_number[0]
        );
      }

      console.log("error message from forgot password", error);
    }
  };

  return (
    <section className="lg:h-screen no-scrollbar h-full overflow-scroll text-default">
      <div className=" lg:grid h-full grid-cols-2 items-center relative bg-white">
        <div className=" relative h-full lg:flex items-center">
          {/* <div className=" mt-[2.5rem] lg:mt-[4.69rem] mb-[2.31rem] lg:mb-[5.56rem] w-[10.625rem] mx-auto  ">
            <span className="hidden lg:block">{lgLogo}</span>
            <span className="lg:hidden">{smLogo}</span>
          </div> */}
          {isSuccess ? (
            <SuccessUI
              action="Continue"
              heading="Password Reset Initiated"
              subheading="You're now fully verified and can access PRO features"
              link="/auth/onboard"
            />
          ) : (
            <div className="max-lg:mt-[8.19rem] max-lg:pb-[100px] max-w-[485px] w-full mx-auto max-md:px-[35px]  bg-white">
              <div className=" mb-[3.31rem] lg:mb-[3rem] ">
                <h3 className="text-[1.74419rem] lg:text-[2.15rem] font-normal ">
                  Verify Supreme Court number
                </h3>
                <p className="text-[0.87206rem] md:text-sm mt-[1rem] md:mt-[0.62rem] ">
                  Please enter the Supreme court number associated with your
                  account
                </p>
                {resmessage && (
                  <p className="text-[green] text-[0.87206rem] md:text- base max-w-[19.0625rem] mt-[1rem] md:mt-[0.62rem] font-normal leading-[normal">
                    {resmessage}.{/* Please check your mailbox. */}
                  </p>
                )}
              </div>

              <Formik
                initialValues={{
                  SC_NO: "",
                  // email: ""
                }}
                validationSchema={Yup.object({
                  //   email: Yup.string().email().required("Required"),
                  SC_NO: Yup.string().required("Required"),
                })}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="relative mb-[0.8rem]">
                    <div className="flex items-center px-[20px] py-[16px] rounded-[5px] border border-solid border-gray-black ">
                      <Field
                        type="text"
                        name="SC_NO"
                        // value={formValue.email}
                        // onChange={handleChange}
                        placeholder="SC_NO"
                        className="focus:outline-0  w-full font-normal text-gray-authinput text-sm"
                      />
                    </div>
                    <ErrorMessageCtn>
                      <ErrorMessage name="SC_NO" />
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
                          action: errorMessage ? "Try Again" : "Submit",
                        }}
                      />
                    }
                    <Link href={"/auth/onboard"}>
                      <button className="bg-[rgba(41,82,255,.1)] mt-[16px] w-full py-[16px] px-4 h-[56px]  tracking-wide text-primary transition-colors duration-200 rounded-[5px]">
                        SKIP
                      </button>
                    </Link>
                  </div>
                </Form>
              </Formik>
            </div>
          )}
        </div>
        <AuthSideCover page="forgot-password" />
      </div>
    </section>
  );
};

export default SCverificationPage;
