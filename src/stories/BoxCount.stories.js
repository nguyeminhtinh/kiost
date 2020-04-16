// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// Component
import { BoxCount } from 'components/BoxCount';

storiesOf('BoxCount', module)
  .addDecorator(withInfo)
  .add('BoxCount', () => (
    <BoxCount
      image="https://images.viblo.asia/thumbnail/007f6014-5780-4452-828c-f6f6382fdcdd.png"
      customClass=""
      number="1200"
      alt="images"
      titleLink="상세보기"
      OnDetail="#"
      iconDetail
      titleHeader="총 매장 수"
    />
  ));
