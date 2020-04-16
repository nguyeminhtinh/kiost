// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// Component
import { TitleHeader } from 'components/TitleHeader';

storiesOf('TitleHeader', module)
  .addDecorator(withInfo)
  .add('TitleHeader', () => <TitleHeader title="메인화면" />);
