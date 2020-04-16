// Libs
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// Component
import { PrimaryButton } from 'components/Button';
import { ModalPrimary } from 'components/Modal';

storiesOf('Modal', module)
  .addDecorator(withInfo)
  .add('Modal', () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <PrimaryButton
          text="Click Me"
          type="primary"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Open Modal
        </PrimaryButton>
        <ModalPrimary
          title="알림"
          content="등록되었습니다"
          isOpen={isOpen}
          handleClose={() => {
            setIsOpen(false);
          }}
          isShowTowBtn={false}
          textBtnLeft="확인"
        />
      </div>
    );
  });
