// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

// Component
import { faUser } from '@fortawesome/free-solid-svg-icons';
import SelectDropdown from 'components/Select';

const listItem = [
  { value: 'naver.com', label: 'naver.com' },
  { value: 'hanmail.net', label: 'hanmail.net' },
  { value: 'nate.com', label: 'nate.com' },
  { value: 'gmail.com', label: 'gmail.com' }
];

storiesOf('SelectDropdown', module)
  .addDecorator(withInfo)
  .add('Outline', () => (
    <SelectDropdown
      placeholder="List Select"
      label="Select"
      listItem={listItem}
      onChange={action('on-change')}
      icon={faUser}
      disabled={false}
      isSearchable={false}
      blurInputOnSelect={false}
    />
  ));
