import React, { FormEvent, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Head, Header, Input } from "@app/components/ui";
import { AuthLayout as Layout } from "@app/components/layout";
import { logo } from "@app/assets";
import { NextPageWithLayout } from "@app/types";

const Page: NextPageWithLayout = () => {
  const router = useRouter();

  function handleForm(event: FormEvent<HTMLFormElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Fragment>
      <Head title={"Signin"} />
      <Layout className="relative">
        <section className="flex-1  min-h-full">
          <Header variants="banner" />
          <div className="flex flex-col gap-6 md:max-w-[680px] my-8 mx-auto px-8">
            <div>
              <h3 className="text-center mb-3">Reset your password?</h3>
            </div>

            <form
              onSubmit={handleForm}
              className="flex flex-col gap-4 space-y-3 mx-auto"
            >
              <div>
                <Input
                  type="password"
                  name={"password"}
                  placeholder="*********"
                  className="input"
                />
              </div>

              <div>
                <Input
                  type="password"
                  name={"confirmpassword"}
                  placeholder="*********"
                  className="input"
                />
              </div>

              <Button
                label={"Reset password"}
                type="submit"
                className="text-center w-full"
              />
            </form>
          </div>
        </section>
        <footer className="w-full absolute bottom-0 left-0 py-6 ">
          <p className="text-center mb-3">
            Need help?{" "}
            <Link href="/">
              <span className="text-decoration-underline">Contact Support</span>
            </Link>
          </p>

          <p className="text-center text-[#7E858E]">
            &copy;2024, All Rights Reserved. LexAnalytics®
          </p>
        </footer>
      </Layout>
    </Fragment>
  );
};

export default Page;
