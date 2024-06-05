import React, { useContext } from 'react';
import { Modal } from '@app/components/ui';
import SearchBox from './SearchBox';
import { AppLayoutContext as LayoutContext } from '@app/components/layout';

const SearchModal = () => {
  const { isSearchModal, setIsSearchModal } = useContext(LayoutContext);

  return (
    <Modal show={isSearchModal} toogleModal={() => setIsSearchModal(false)}>
      <div className='flex flex-col justify-center max-w-full w-[700px] mx-auto '>
        <SearchBox />
      </div>
    </Modal>
  );
};

export default SearchModal;
