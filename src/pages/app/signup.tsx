import React, { ChangeEvent, FormEvent, Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";

import { Head } from "@app/components/ui";
import { AuthLayout as Layout } from "@app/components/layout";
import { logo } from "@app/assets";
import { NextPageWithLayout } from "@app/types";
import { ArrowLeftIcon } from "@app/components/icons";

type FormStep = { id: string; label: string };
type FormAccountType = "Student" | "Professional" | "Enterprise";

const steps: Array<FormStep> = [
  { id: "step1", label: "Continue" },
  { id: "step2", label: "Signup" },
];

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const [captchaValue, setCaptchaValue] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(true);
  const [formStep, setFormStep] = useState<FormStep>(steps[0]);
  const [formAccountType, setFormAccountType] =
    useState<FormAccountType>("Student");
  const [accountOptions, setAccountOptions] = useState();

  const handleSignup = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // throw new Error("Function not implemented.");

    if (formStep.id === "step2") {
      console.log("step2");
      return;
    }

    console.log("step1");
    setFormStep(steps[1]);
  };

  const signupBackButton = () => {};

  const onAccountTypeChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value as FormAccountType;
    setFormAccountType(value);
    // throw new Error("Function not implemented.");
  };

  const handleToken = (token: string | null) => {
    if (token) {
      setCaptchaValue(token);
      setIsVerified(false);
    }
  };

  return (
    <Fragment>
      <Head title={"Signin"} />
      <Layout>
        <section className="flex-1 flex relative min-h-full">
          <div className="grow relative min-h-full md:w-[50%] overflow-hidden justify-center items-center px-6 py-12 lg:px-8 z-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <Link href={"/"}>
                <Image
                  src={logo}
                  alt="Lex Logo"
                  className="mx-auto h-10 w-auto"
                />
              </Link>

              <h5 className="mt-10 text-center font-bold tracking-tight text-gray-900">
                Register
              </h5>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form id="signup" onSubmit={handleSignup} className="space-y-6">
                {formStep.id === "step1" && (
                  <div className="signup-one space-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Fullname
                      </label>
                      <div className="mt-2">
                        <input
                          id="fullname"
                          name="fullname"
                          type="text"
                          autoComplete="fullname"
                          required
                          className="input input-2"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="input input-2"
                          placeholder="john@mail.com"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Password
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="off"
                          required
                          className="input input-2"
                          placeholder="*********"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="account-type"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Account type
                      </label>
                      <div className="mt-2">
                        <select
                          id="account-type"
                          name="account-type"
                          autoComplete="account-type"
                          className="input input-2 px-[1.25rem]"
                          required
                          onChange={onAccountTypeChange}
                        >
                          <option>Student</option>
                          <option>Professional</option>
                          {/* <option>Mexico</option> */}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {formStep.id === "step2" && (
                  <div className="signup-two space-y-6">
                    <div>
                      <button
                        onClick={() => setFormStep(steps[0])}
                        className="inline-flex space-x-2 hover:opacity-60"
                      >
                        <ArrowLeftIcon stroke="#000000" />
                        <span> Go back</span>
                      </button>
                    </div>

                    {formAccountType === "Enterprise" && (
                      <Fragment>
                        <p>Enterprise</p>
                      </Fragment>
                    )}

                    {formAccountType === "Professional" && (
                      <Fragment>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="account-type"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Area of Interest
                          </label>
                          <div className="mt-2">
                            <select
                              id="account-type"
                              name="account-type"
                              autoComplete="account-type"
                              className="input input-2 px-[1.25rem]"
                              required
                            >
                              <option>Select</option>
                            </select>
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="account-type"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Area of specialization
                          </label>
                          <div className="mt-2">
                            <select
                              id="account-type"
                              name="account-type"
                              autoComplete="account-type"
                              className="input input-2 px-[1.25rem]"
                              required
                            >
                              <option>Select</option>
                            </select>
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="account-type"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Industry focus
                          </label>
                          <div className="mt-2">
                            <select
                              id="account-type"
                              name="account-type"
                              autoComplete="account-type"
                              className="input input-2 px-[1.25rem]"
                              required
                            >
                              <option>Select</option>
                            </select>
                          </div>
                        </div>
                      </Fragment>
                    )}

                    {formAccountType === "Student" && (
                      <Fragment>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            School name
                          </label>
                          <div className="mt-2">
                            <input
                              id="fullname"
                              name="fullname"
                              type="text"
                              autoComplete="fullname"
                              required
                              className="input input-2"
                              placeholder="John Doe"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="account-type"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Area of Interest
                          </label>
                          <div className="mt-2">
                            <select
                              id="account-type"
                              name="account-type"
                              autoComplete="account-type"
                              className="input input-2 px-[1.25rem]"
                              required
                            >
                              <option>Select</option>
                            </select>
                          </div>
                        </div>
                      </Fragment>
                    )}

                    <div>
                      <ReCAPTCHA
                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        onChange={handleToken}
                        // onExpire={handleExpire}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <button
                    id="submit-btn"
                    type="submit"
                    form="signup"
                    className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {formStep.label}
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Have an account?
                <Link
                  href={"/signin"}
                  className="font-semibold leading-6 text-primary hover:text-primary/60"
                >
                  <span> Login</span>
                </Link>
              </p>
            </div>
          </div>

          <div className="grow relative min-h-full hidden md:block md:w-[50%] overflow-hidden">
            <div
              className={`relative overflow-hidden flex flex-col justify-center
            rounded-e-lg p-8 z-10 min-h-full w-full  
            before:absolute before:top-0 before:left-0 before:block before:w-full 
            before:min-h-full before:bg-no-repeat before:bg-cover
            before:bg-overlay before:z-0
              ${
                formAccountType === "Enterprise"
                  ? "bg-accountType1"
                  : formAccountType === "Professional"
                  ? "bg-accountType3"
                  : "bg-accountType2"
              }`}
            >
              <div className="z-10">
                <h1 className="text-white text-2xl mb-3">
                  Easily create an account
                  <br /> to get started!
                </h1>
                <p className="text-white">
                  Need help?{" "}
                  <Link href="/">
                    <span className="decot">Contact Support</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </Fragment>
  );
};

export default Page;
