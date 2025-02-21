import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthSideCover from "@app/components/app/authentication/AuthSideCover";
import ErrorMessageServer from "@app/components/app/authentication/ErrorMessageServer";
import SmallLoadingSpinner from "@app/components/app/authentication/smLoadingSpinner";
import { useCreateNewPasswordMutation } from "@app/store/services/authenticationslice";
const CreateNewPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const VerificationToken = searchParams.get("token");
  console.log("token available", VerificationToken);
  const [createNewPassword, { isLoading }] = useCreateNewPasswordMutation();
  const [pwdInputType, setPwdInputType] = useState({
    password: false,
    password2: false,
  });
  type InitiaStateT = {
    password: string;
    password2: string;
    [key: string]: string;
  };
  const [succesMsg, setSuccesMsg] = useState<boolean | null>(null);
  const [errorMessage, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (
    values: InitiaStateT,
    { resetForm }: { resetForm: any }
  ) => {
    setErrorMsg(null);
    setSuccesMsg(null);
    try {
      // console.log("Response from forgot password page", {
      //   id: VerificationToken,
      //   pwd: values.password,
      // });
      // const res = await createNewPassword({
      //   id: VerificationToken,
      //   pwd: values.password,
      // }).unwrap();
      // console.log("Response from forgot password page", res);
      // if (res?.message === "Password reset successful") {
      //   setSuccesMsg(true);
      // }
      // setSubmitting(false);
      //   if (true) router.push("/auth/login");
    } catch (error) {
      // if (!error) return "No server response";
      // if ((error as errorRtk)?.data) {
      //   setErrorMsg((error as errorRtk)?.data.detail);
      // }
      console.log(error);
    }
  };

  // if (isLoading) return <Loading />;
  return (
    <section className="lg:h-svh  text-default2">
      <div className=" lg:grid h-full grid-cols-2 items-center relative bg-white">
        <div className="relative flex items-center z-0 h-full  pb-5">
          {/* <Success SuccesState={{ setSuccesMsg, succesMsg }} /> */}

          <div className=" max-w-[25.6875rem] md:w-[25.6875rem] mx-auto max-lg:pl-[2.51rem] max-lg:pr-[3.11rem] bg-white ">
            <div className=" mb-[3.31rem] lg:mb-[3rem] ">
              <h3 className="text-[1.74419rem] lg:text-[2.15rem] font-normal ">
                Set new password
              </h3>
              <p className="text-[0.87206rem] md:text-sm mt-[1rem] md:mt-[0.62rem] ">
                Enter your new password in the field provided below.
              </p>
              {/* {resmessage && (
                <p className="text-[red] text-[0.87206rem] md:text- base max-w-[19.0625rem] mt-[1rem] md:mt-[0.62rem] font-normal leading-[normal">
                  {resmessage}. Please check your mailbox.
                </p>
              )} */}
            </div>

            <Formik
              initialValues={{
                password: "",
                password2: "",
              }}
              validationSchema={Yup.object({
                password: Yup.string().required("Required").min(8),
                password2: Yup.string()
                  .oneOf([Yup.ref("password")], "Passwords must match")
                  .required("Required"),
              })}
              onSubmit={handleSubmit}
            >
              <Form>
                {/* <Form onSubmit={handleSubmit}> */}
                <div className="pt-[40px] mb-[18px] relative  ">
                  <span className="mb-[5px] text-[0.75rem] font-normal inline-block">
                    New password
                  </span>{" "}
                  <div className="flex items-center px-[20px] py-[16px] rounded-[5px] border border-solid border-gray-black">
                    <Field
                      type={pwdInputType.password ? "password" : "text"}
                      name="password"
                      // value={formValue.password}
                      // onChange={handleChange}
                      placeholder="Password"
                      className="focus:outline-0  block w-full  font-normal text-gray-authinput text-sm"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="16"
                      viewBox="0 0 21 16"
                      fill="none"
                      onClick={() =>
                        setPwdInputType({
                          ...pwdInputType,
                          password: !pwdInputType.password,
                        })
                      }
                    >
                      <path
                        d="M19.9235 7.6C17.9035 2.91 14.1035 0 10.0035 0C5.90348 0 2.10348 2.91 0.0834848 7.6C0.0284215 7.72617 0 7.86234 0 8C0 8.13766 0.0284215 8.27383 0.0834848 8.4C2.10348 13.09 5.90348 16 10.0035 16C14.1035 16 17.9035 13.09 19.9235 8.4C19.9785 8.27383 20.007 8.13766 20.007 8C20.007 7.86234 19.9785 7.72617 19.9235 7.6ZM10.0035 14C6.83348 14 3.83348 11.71 2.10348 8C3.83348 4.29 6.83348 2 10.0035 2C13.1735 2 16.1735 4.29 17.9035 8C16.1735 11.71 13.1735 14 10.0035 14ZM10.0035 4C9.21236 4 8.439 4.2346 7.7812 4.67412C7.12341 5.11365 6.61072 5.73836 6.30797 6.46927C6.00522 7.20017 5.926 8.00444 6.08034 8.78036C6.23468 9.55628 6.61565 10.269 7.17506 10.8284C7.73447 11.3878 8.4472 11.7688 9.22312 11.9231C9.99905 12.0775 10.8033 11.9983 11.5342 11.6955C12.2651 11.3928 12.8898 10.8801 13.3294 10.2223C13.7689 9.56448 14.0035 8.79113 14.0035 8C14.0035 6.93913 13.5821 5.92172 12.8319 5.17157C12.0818 4.42143 11.0644 4 10.0035 4ZM10.0035 10C9.60792 10 9.22124 9.8827 8.89234 9.66294C8.56345 9.44318 8.3071 9.13082 8.15573 8.76537C8.00435 8.39991 7.96474 7.99778 8.04191 7.60982C8.11908 7.22186 8.30957 6.86549 8.58927 6.58579C8.86898 6.30608 9.22534 6.1156 9.6133 6.03843C10.0013 5.96126 10.4034 6.00087 10.7689 6.15224C11.1343 6.30362 11.4467 6.55996 11.6664 6.88886C11.8862 7.21776 12.0035 7.60444 12.0035 8C12.0035 8.53043 11.7928 9.03914 11.4177 9.41421C11.0426 9.78929 10.5339 10 10.0035 10Z"
                        fill="#8C7B8F"
                      />
                    </svg>
                  </div>
                  <span className="text-[red] text-sm absolute left-[0.94rem] bottom-[-25px] bg-default">
                    <ErrorMessage name="password" />
                  </span>
                </div>
                <div className=" mb-[18px] relative  ">
                  <span className="mb-[5px] text-[0.75rem] font-normal inline-block">
                    Confirm password
                  </span>{" "}
                  <div className="flex items-center px-[20px] py-[16px] rounded-[5px] border border-solid border-gray-black">
                    <Field
                      type={pwdInputType.password2 ? "password" : "text"}
                      name="password2"
                      // value={formValue.password2}
                      // onChange={handleChange}
                      placeholder="Confirm Password"
                      className="focus:outline-0  block w-full  font-normal text-gray-authinput text-sm"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="16"
                      viewBox="0 0 21 16"
                      fill="none"
                      onClick={() =>
                        setPwdInputType({
                          ...pwdInputType,
                          password2: !pwdInputType.password2,
                        })
                      }
                    >
                      <path
                        d="M19.9235 7.6C17.9035 2.91 14.1035 0 10.0035 0C5.90348 0 2.10348 2.91 0.0834848 7.6C0.0284215 7.72617 0 7.86234 0 8C0 8.13766 0.0284215 8.27383 0.0834848 8.4C2.10348 13.09 5.90348 16 10.0035 16C14.1035 16 17.9035 13.09 19.9235 8.4C19.9785 8.27383 20.007 8.13766 20.007 8C20.007 7.86234 19.9785 7.72617 19.9235 7.6ZM10.0035 14C6.83348 14 3.83348 11.71 2.10348 8C3.83348 4.29 6.83348 2 10.0035 2C13.1735 2 16.1735 4.29 17.9035 8C16.1735 11.71 13.1735 14 10.0035 14ZM10.0035 4C9.21236 4 8.439 4.2346 7.7812 4.67412C7.12341 5.11365 6.61072 5.73836 6.30797 6.46927C6.00522 7.20017 5.926 8.00444 6.08034 8.78036C6.23468 9.55628 6.61565 10.269 7.17506 10.8284C7.73447 11.3878 8.4472 11.7688 9.22312 11.9231C9.99905 12.0775 10.8033 11.9983 11.5342 11.6955C12.2651 11.3928 12.8898 10.8801 13.3294 10.2223C13.7689 9.56448 14.0035 8.79113 14.0035 8C14.0035 6.93913 13.5821 5.92172 12.8319 5.17157C12.0818 4.42143 11.0644 4 10.0035 4ZM10.0035 10C9.60792 10 9.22124 9.8827 8.89234 9.66294C8.56345 9.44318 8.3071 9.13082 8.15573 8.76537C8.00435 8.39991 7.96474 7.99778 8.04191 7.60982C8.11908 7.22186 8.30957 6.86549 8.58927 6.58579C8.86898 6.30608 9.22534 6.1156 9.6133 6.03843C10.0013 5.96126 10.4034 6.00087 10.7689 6.15224C11.1343 6.30362 11.4467 6.55996 11.6664 6.88886C11.8862 7.21776 12.0035 7.60444 12.0035 8C12.0035 8.53043 11.7928 9.03914 11.4177 9.41421C11.0426 9.78929 10.5339 10 10.0035 10Z"
                        fill="#8C7B8F"
                      />
                    </svg>
                  </div>{" "}
                  <span className="text-[red] text-sm absolute left-[0.94rem] bottom-[-25px]">
                    <ErrorMessage name="password2" />
                  </span>
                </div>
                <div className="relative flex items-center mt-[3.37rem]">
                  {/* {<AuthBtn btnProps={{ isLoading, action: "Submit" }} />} */}
                  {
                    errorMessage && (
                      <ErrorMessageServer>
                        {errorMessage && errorMessage}
                      </ErrorMessageServer>
                    )
                    // <ErrorMessageServer>Hello it it working</ErrorMessageServer>
                  }
                  <button
                    type="submit"
                    // onClick={() => setSuccesMsg(true)}
                    disabled={VerificationToken ? false : true}
                    className="mt-5 w-full h-[3.05231rem] md:h-[3.25rem] px-4 py-2 tracking-wide text-white  bg-blue_btn disabled:cursor-not-allowed rounded-[5px]  focus:outline-none relative"
                  >
                    {isLoading ? <SmallLoadingSpinner /> : "Submit password"}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
        <AuthSideCover page="create-new-password" />
      </div>
    </section>
  );
};

export default CreateNewPassword;
