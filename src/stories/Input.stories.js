// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

// Component
import Input from 'components/Input';
import { faUser } from '@fortawesome/free-solid-svg-icons';

storiesOf('Input', module)
  .addDecorator(withInfo)
  .add('Outline', () => (
    <Input
      placeholder="input value"
      type="text"
      label="User"
      onChange={action('on-change')}
      icon={faUser}
    />
  ));
