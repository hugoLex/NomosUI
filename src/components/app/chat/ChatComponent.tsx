import ChatInterface from "@app/components/app/chat/chatItem";
import { DropdownMenuChat } from "@app/components/app/chat/profileDropDown";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiProfileFill } from "react-icons/ri";

function ChatIndex() {
  return (
    <section>
      <div>
        <div className="px-[24px] py-[18px] flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <div className="relative rounded-full overflow-clip w-[40px] h-[40px] ">
              <Image
                className=""
                style={{ objectFit: "cover" }}
                fill
                src={`/images/${"judge_analytics_av.jpg"}`}
                loading="lazy"
                alt="judge counsel profile"
              />
            </div>
            <div>
              <Link
                href={`/analytics/judges`}
                className="text-[1.1rem] text-powder_blue font-semibold  font-gilda_Display"
              >
                Chibuike Ewenike
              </Link>
              <h3 className="text-xs font-normal text-lex-blue">typing...</h3>
              {/* <h3 className="text-sm text-lex-blue font-normal">
              Cases count: {"100"}
            </h3> */}
            </div>
          </div>

          <div className="relative flex gap-[1.5rem] items-center">
            <Link href={""}>
              <RiProfileFill />
            </Link>
            <Link href={""}>
              <RiProfileFill />
            </Link>
            {/* this is to show or hide the drop down  */}
            <DropdownMenuChat classname="" isOpen="false" />
          </div>
        </div>
        <ChatInterface />
      </div>
    </section>
  );
}

export default ChatIndex;
