import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Error } from "@app/types";
import AuthSideCover from "@app/components/app/authentication/AuthSideCover";
import { useSignupMutation } from "@app/store/services/authenticationslice";
import Image from "next/image";
import { logo } from "@app/assets";
import SignupForm1 from "./signup1";
import SignupForm2 from "./signupform2";
import { toast } from "sonner";
import { AuthErrorT } from "@app/types/auth";
import useQueryToggler from "@app/hooks/useQueryHandler";

export type SignUpInitialStateT = {
  email: string;
  phone: string;
  // professional: string;
  role: string;
  // areas: string[];
  organization: string;
  password: string;
  confirm_password: string;
  remember: boolean;
  full_name: string;
  [key: string]: string | boolean;
  // [key: string]: string | boolean|string[];
};
const Signup = () => {
  const { router } = useQueryToggler();
  const [signup, { isLoading }] = useSignupMutation();
  // {
  //   "email": "sopewenike@gmail.com",
  //   "full_name": "Chibuike Ewenike",
  //   "password": "@Sopnikes112",
  //   "areas": [
  //    7
  //   ],
  //   "role": "STUDENT",
  //   "confirm_password": "@Sopnikes112"
  // }
  const InitiaState: SignUpInitialStateT = {
    email: "",
    full_name: "",
    phone: "",
    // areas: [],
    organization: "",
    role: "PROFESSIONAL",
    // student: "",
    password: "",
    confirm_password: "",
    remember: true,
  };

  const [errorMessage, setErrorMsg] = useState<string | null>(null);
  const [activeForm, setActiveForm] = useState<string | null>("form1");

  const formik = useFormik({
    initialValues: InitiaState,
    validationSchema: Yup.object({
      email: Yup.string().email().required("Required"),
      password: Yup.string().required("Required").min(8),
      phone: Yup.string().required("Required").min(11),
      // professional: Yup.string().required("Required"),
      organization: Yup.string().required("Required"),
      // student: Yup.string().required("Required"),
      role: Yup.string().required("Required"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        // .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),

      full_name: Yup.string().required("Required"),
    }),
    onSubmit: handleSubmit,
  });

  async function handleSubmit(
    values: SignUpInitialStateT,
    { resetForm }: { resetForm: any }
  ) {
    // {
    //   "email": "sopewenike@gmail.com",
    //   "full_name": "Chibuike Ewenike",
    //   "password": "@Sopnikes112",
    //   "areas": [
    //    7
    //   ],
    //   "role": "STUDENT",
    //   "confirm_password": "@Sopnikes112"
    // }
    setErrorMsg(null);
    const { remember, email, ...rest } = values;
    console.log("Attempting to signup", { email, ...rest });
    try {
      const res = await signup({
        ...rest,
        email: email.toLowerCase(),
        areas: [
          "Due diligence",
          "Legal research",
          "Legal writing",
          "Mediation",
        ], //remove this before production
      }).unwrap();

      // resetForm();

      console.log("Response from signup page,saving!!", {
        res,
      });
      router.push(`/auth/onboard?email=${email.toLowerCase()}`);
    } catch (error) {
      if ((error as Error)?.message) {
        toast((error as Error)?.message);

        setErrorMsg((error as Error)?.detail);
        // toast.error((error as errorRtk)?.data?.detail);
      }
      if ((error as AuthErrorT).data.detail) {
        toast((error as AuthErrorT).data.detail);
      }
      if (
        (error as { data: { non_field_errors: string[] } })?.data
          .non_field_errors
      ) {
        toast(
          (error as { data: { non_field_errors: string[] } })?.data
            ?.non_field_errors[0]
        );
        setErrorMsg(
          (error as { data: { non_field_errors: string[] } })?.data
            ?.non_field_errors[0]
        );
        console.error(
          (error as { data: { non_field_errors: string[] } })?.data
            ?.non_field_errors[0]
        );
        // toast.error((error as errorRtk)?.data?.detail);
      }
      if ((error as { data: { email: string[] } }).data.email) {
        toast((error as { data: { email: string[] } }).data.email[0]);
        // setErrorMsg((error as { data: { email: string[] } }).data.email[0]);
      }
      if ((error as { data: { phone: string[] } }).data.phone) {
        toast(
          `Phone: ${(error as { data: { phone: string[] } }).data.phone[0]}`
        );
        // setErrorMsg(
        //   `Phone: ${(error as { data: { phone: string[] } }).data.phone[0]}`
        // );
      }

      console.log("signup failed!!!", error);
    }
  }

  const capitalizeFirstLetter = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

  return (
    <section className="h-screen overflow- text-default">
      <div className=" lg:grid h-full grid-cols-2 items-center relative bg-white ">
        {/* add to all auth, relative h-full grid place-content-center */}
        <div className="lg:overflow-y-scroll no-scrollbar absolute max-lg:bottom-[50%] max-lg:translate-y-[50%] max-lg:w-full  lg:relative lg:pt-[65px] justify-between lg:items-center flex max-md:flex-col lg:h-screen  ">
          <div className="lg:pt-[300px] lg:pb-[50px] max-w-[25.6875rem] md:w-[25.6875rem] mx-auto max-lg:pl-[2.51rem] max-lg:pr-[3.11rem] bg-white ">
            <div className="text-center ">
              {activeForm === "form2" && (
                <p className="text-sm font-normal ">
                  Already have an account ?{" "}
                  <Link
                    className="text-[0.75rem] text-primary cursor-pointer"
                    href="/auth/login"
                  >
                    Login
                  </Link>
                </p>
              )}
              <Link
                className="mt-[35px] mb-[20px] flex justify-center"
                href={"/"}
              >
                <Image
                  src={logo}
                  alt="Lex Logo"
                  className="mx-auto h-10 w-auto"
                />
              </Link>
              <p className="text-[1.5rem] mb-[1.81rem] text-black  leading-[normal]">
                {activeForm === "form1"
                  ? // ? ""
                    "Signup"
                  : `${capitalizeFirstLetter(formik.values.role)} Account`}
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              {activeForm === "form1" && (
                <SignupForm1
                  formik={formik}
                  errorMessage={errorMessage}
                  isLoading={isLoading}
                  setActiveForm={setActiveForm}
                />
              )}{" "}
              {activeForm === "form2" && (
                <SignupForm2
                  formik={formik}
                  errorMessage={errorMessage}
                  isLoading={isLoading}
                  setActiveForm={setActiveForm}
                />
              )}
            </form>
          </div>
        </div>
        <AuthSideCover page="signup" />
      </div>
    </section>
  );
};

export default Signup;
