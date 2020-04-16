// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// Component
import { Loading } from 'components/Loading';

storiesOf('Loading', module)
  .addDecorator(withInfo)
  .add('Primary', () => (
    <div className="wrapper-loading">
      <Loading
        animation="grow"
        role="status"
        className=""
        text=""
        variant="dark"
        size="lg"
      />
    </div>
  ));
