// @flow
// libs
import React, { memo } from 'react';
import ModalPrimary from 'components/Modal';
import ContenPopup from './ContenPopup';

type Props = {
  isOpen: boolean,
  handleClose: Function
};

export const ModalMerchantSelect = ({ isOpen, handleClose }: Props) => (
  <ModalPrimary
    title="가맹점 선택"
    size="lg"
    content={<ContenPopup />}
    animation={false}
    isOpen={isOpen}
    handleClose={handleClose}
  />
);
export default memo<Props>(ModalMerchantSelect);
