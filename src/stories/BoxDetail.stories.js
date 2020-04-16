// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// Component
import { BoxDetail } from 'components/BoxDetail';

storiesOf('BoxDetail', module)
  .addDecorator(withInfo)
  .add('BoxDetail', () => (
    <BoxDetail productName="상품명" receipt="2" stock="3" quantity="4" />
  ));
