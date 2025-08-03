import ChatIndex from "@app/components/app/chat/ChatComponent";
import React, { Fragment } from "react";
import { Button, Head, Loader } from "@app/components/ui";
import { AppLayout, AppLayoutContext } from "@app/components/layout";
import { NextPageWithLayout } from "@app/types";
import { Container, ErrorView404, Navbar } from "@app/components/shared";
import {
  useChat_enpointMutation,
  useFetch_chatQuery,
} from "@app/store/services/chatSlice";
import ChatbotApp from "@app/components/app/chat/chatbot";
const ChatPage: NextPageWithLayout = () => {
  const [] = useChat_enpointMutation();
  const { data, isError, isLoading } = useFetch_chatQuery("");
  if (isLoading) {
    // Early return for loading state
    return (
      <Fragment>
        <Navbar />
        {/* Removed isTitle as it's always false*/}
        <div className="flex-1 flex flex-col justify-center items-center self-stretch py-6 min-h-[]">
          <Loader variant="classic" size={80} />
        </div>
      </Fragment>
    );
  }

  //   if (!data && isError) {
  //     // Simplified error check
  //     return (
  //       <Fragment>
  //         <Head title={`Chat - ${"AI"}`} />
  //         <Navbar />
  //         <ErrorView404
  //           caption="No matching legal resources found"
  //           desc="Check your search terms and try again, or explore our curated collection of legal resources to find what you need"
  //         />
  //       </Fragment>
  //     );
  //   }
  return (
    <>
      <Navbar />
      <Container>
        <div className={`py-8 w-full md:min-w-[980px]`}>
          {/* <ChatIndex /> */}
          <ChatbotApp />
        </div>
      </Container>
    </>
  );
};

// export default ChatPage;

ChatPage.getLayout = (page) => (
  <Fragment>
    <Head title={`Chat - `} />
    <AppLayout>{page}</AppLayout>;
  </Fragment>
);

export default ChatPage;
