import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Head } from "@app/components/ui";
import { AuthLayout as Layout } from "@app/components/layout";
import { accountType1, logo } from "@app/assets";
import { NextPageWithLayout } from "@app/types";

const Page: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <Fragment>
      <Head title={"Signin"} />
      <Layout>
        <section className="flex-1 flex min-h-full">
          <div className="grow relative min-h-full md:w-[50%] overflow-hidden">
            <div className="flex flex-col justify-center p-8 min-h-full">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Link href={"/"}>
                  <Image
                    src={logo}
                    alt="Lex Logo"
                    className="mx-auto h-10 w-auto"
                  />
                </Link>
                <h5 className="mt-10 text-center font-bold tracking-tight text-gray-900">
                  Sign in to your account
                </h5>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="input"
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
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="text-sm my-6">
                      <Link
                        href={"/forgotpassword"}
                        className="font-semibold text-primary hover:text-primary/60"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign in
                    </button>
                  </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                  Don&apos;t have an account?
                  <Link
                    href={"/signup"}
                    className="font-semibold leading-6 text-primary hover:text-primary/60"
                  >
                    <span> Signup</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="grow relative min-h-full hidden md:block md:w-[50%] overflow-hidden">
            <div
              className="relative overflow-hidden flex flex-col justify-center
            rounded-e-lg p-8 z-10 min-h-full w-full bg-[url('/images/account1.webp')] 
            before:absolute before:top-0 before:left-0 before:block before:w-full 
            before:min-h-full before:bg-no-repeat before:bg-cover
            before:bg-overlay before:z-0 "
            >
              <div className="z-10">
                <h1 className="text-white text-2xl mb-3">
                  It&apos;s time to <br /> get productive
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
