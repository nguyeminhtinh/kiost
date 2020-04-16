// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// Component
import { Avatar } from 'components/Avatar';

storiesOf('Avatar', module)
  .addDecorator(withInfo)
  .add('Admin', () => (
    <Avatar
      url="https://images.viblo.asia/thumbnail/007f6014-5780-4452-828c-f6f6382fdcdd.png"
      customClass=""
      value="Admin"
    />
  ));
