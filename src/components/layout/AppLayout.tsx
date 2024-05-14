import React, { FC, useState } from "react";
import { useRouter } from "next/router";

import { ComponentProps } from "@app/types";
import { Sidebar, View } from "../ui";
import { LayoutContext } from ".";

const AppLayout: FC<ComponentProps> = ({ children }) => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);

  const values = {};

  return (
    <LayoutContext.Provider value={values}>
      <div className="flex h-full min-h-[100vh] bg-[linear-gradient(0deg,#F3F3EE_0%,#F3F3EE_100%,#FFF)]">
        <Sidebar />
        <View className="grow lg:pr-2 lg:py-2">
          <div className="flex justify-center items-center self-stretch px-16  w-full rounded-lg shadow-sm bg-stone-50 max-md:px-5 max-md:max-w-full">
            {children}
          </div>
        </View>
      </div>
    </LayoutContext.Provider>
  );
};

export default AppLayout;
