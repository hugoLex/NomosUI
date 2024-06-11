import React, { FC, createContext, useState } from 'react';
import { useRouter } from 'next/router';

import { ComponentProps, LayoutContextProp } from '@app/types';
import { Sidebar, View } from '../ui';
import { SearchModal } from '../app';

export const AppLayoutContext = createContext<LayoutContextProp>({
  isSearchModal: false,
  setIsSearchModal: () => {},
});

export const AppLayout: FC<ComponentProps> = ({ children }) => {
  const [isSearchModal, setIsSearchModal] = useState<boolean>(false);

  const props = { isSearchModal, setIsSearchModal };

  return (
    <AppLayoutContext.Provider value={props}>
      <div className='flex min-h-screen md:h-screen bg-[linear-gradient(0deg,#eaf0f2_0%,#eaf0f2_100%,#FFF)]'>
        <Sidebar />
        <View className='grow lg:pr-2 lg:py-2 overflow-y-auto md:h-full'>
          <div
            className='flex flex-col w-full rounded-lg shadow-sm
           bg-stone-50 max-md:max-w-full min-h-full'>
            {children}
          </div>
        </View>
        <SearchModal />
      </div>
    </AppLayoutContext.Provider>
  );
};
