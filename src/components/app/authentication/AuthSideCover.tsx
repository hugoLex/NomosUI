import { logo } from "@app/assets";
import Image from "next/image";
import Link from "next/link";

function AuthSideCover({ page }: { page: string }) {
  return (
    <div className="max-lg:hidden pt-[2.16rem] md:pt-[4.44rem] lg:pt-0 h-auto lg:h-full w-full  lg:bg-primary relative z-10">
      <div
        className={`relative font-inter  leading-[normal]  md:grid place-items-center h-full w-full`}
      >
        {/* <Image
          fill
          style={{ objectFit: "cover" }}
          src={"/images/loginimg.png"}
          alt="Man standing"
          className=""
        /> */}
        <div className="">
          <div className="relative z-40 mt-auto mb-[.69rem] lg:mb-[.56rem] flex justify-center">
            <span className=" md:block text-[80px] p-4 pr-6 bg-white font-extrabold">
              <Link href="/">
                {" "}
                <Image
                  src={logo}
                  alt="Lex Logo"
                  className="mx-auto h-10 w-auto"
                />
              </Link>
            </span>
          </div>
          <div>
            <h1 className="text-[1.52619rem] md:text-[3rem] lg:text-[2.5rem] xl:text-[3rem] text-white whitesh1ace-nowrap text-center mx-auto">
              Welcome to <Link href="/">{"Lexanalytics"}</Link>
            </h1>
            <p className="md:w-[24.875rem] text-[0.65406rem] md:text-base font-normal mx-auto text-center text-white">
              Research. Draft. Collaborate - All in One Place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthSideCover;
